import {effective_modifiers} from "../modifiers.js"
import {SRD35E} from "../config.js";

export class ActorSRD35E extends Actor {

    prepareBaseData() {
        super.prepareBaseData();
    }

    prepareData() {
        super.prepareData();
        switch(this.data.type) {
            case 'character' :  this._prepareCharacterData(this.data);
        }
    }

    prepareDerivedData() {
    }

    _prepareCharacterData(actorData) {
        const data = actorData.data;
        /*
        ability scores
         */
        for (let [id, abl] of Object.entries(data.abilities)) {
            let modifier = effective_modifiers(abl.modifiers);
            abl.value = abl.baseValue + modifier;
            abl.mod = Math.floor((abl.value - 10) / 2);
            abl.label = SRD35E.abilities_tla[id];
        }
        /*
        Armor class
         */
        let ac = data.attributes.ac;
        ac.value = 10 + effective_modifiers(ac.modifiers, data);
        ac.flatFooted = 10 + effective_modifiers(ac.modifiers, data,
            (modifier) => !((modifier.definition === "abilities.dex.mod" && modifier.isBonus) || modifier.modifierType === 'dodge'));
        ac.touch = 10 + effective_modifiers(ac.modifiers, data,
            (modifier) => modifier.modifierType !== "shield" && modifier.modifierType !== "armor");
    }

    prepareEmbeddedEntities() {
        super.prepareEmbeddedEntities();
        let race = this.items.filter((item) => item.type === 'race')[0];
        if (race) {
            for (let modifier of race?.data?.data?.modifiers) {
                switch (modifier.target) {
                    case 'abilities.dex':
                        this.data.data.abilities.dex.modifiers.push(modifier);
                        break;
                    case 'abilities.con':
                        this.data.data.abilities.con.modifiers.push(modifier);
                        break;
                    case 'abilities.int':
                        this.data.data.abilities.int.modifiers.push(modifier);
                        break;
                    case 'abilities.cha':
                        this.data.data.abilities.cha.modifiers.push(modifier);
                        break;
                }
            }
        }
    }
}
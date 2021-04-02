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
        armor class
         */
        let ac = data.attributes.ac;
        ac.value = 10 + effective_modifiers(ac.modifiers, data);
        ac.flatFooted = 10 + effective_modifiers(ac.modifiers, data,
            (modifier) => !((modifier.definition === 'abilities.dex.mod' && modifier.isBonus) || modifier.modifierType === 'dodge'));
        ac.touch = 10 + effective_modifiers(ac.modifiers, data,
            (modifier) => modifier.modifierType !== 'shield' && modifier.modifierType !== 'armor');
    }

    prepareEmbeddedEntities() {
        super.prepareEmbeddedEntities();
        let race = this.items.filter((item) => item.type === 'race')[0];
    }
}
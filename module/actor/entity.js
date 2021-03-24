import {effective_modifiers} from "../modifiers.js"
import {SRD35E} from "../config.js";

export class ActorSRD35E extends Actor {
    prepareBaseData() {
        switch (this.data.type) {
            case "character":
                this._prepareCharacterData(this.data);
        }
    }
    prepareDerivedData() {
        const actorData = this.data;
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
            (modifier) => !(modifier.definition === "abilities.dex.mod" && modifier.isBonus));
        ac.touch = 10 + effective_modifiers(ac.modifiers, data,
            (modifier) => modifier.modifierType !== "shield" && modifier.modifierType !== "armor");
    }

    _prepareCharacterData(actorData) {
    }
}
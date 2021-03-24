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
        for (let [id, abl] of Object.entries(data.abilities)) {
            let modifier = effective_modifiers(abl.modifiers);
            abl.value = abl.baseValue + modifier;
            abl.mod = Math.floor((abl.value - 10) / 2);
            abl.label = SRD35E.abilities_tla[id];
        }
        let ac = data.attributes.ac;
        ac.value = ac.baseValue + effective_modifiers(ac.modifiers);
        ac.flatFooted = ac.baseValue + effective_modifiers(ac.modifiers, (modifier) => modifier.source !== "dexterity");
        ac.touch = ac.baseValue + effective_modifiers(ac.modifiers, (modifier) => modifier.modifierType !== "shield" && modifier.modifierType !== "armor");
        console.log(getProperty(data,"abilities.dex"));
    }

    _prepareCharacterData(actorData) {

    }
}
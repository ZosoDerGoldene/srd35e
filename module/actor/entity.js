import {calculate_effective_modifiers} from "../modifiers.js"

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
            let modifier = calculate_effective_modifiers(abl.modifiers);
            abl.value = abl.baseValue + modifier;
            abl.mod = Math.floor((abl.value - 10) / 2);
        }
    }

    _prepareCharacterData(actorData) {

    }
}
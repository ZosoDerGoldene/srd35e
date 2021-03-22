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
            let s = calculate_effective_modifiers(abl.modifiers);
            abl.mod = Math.floor((abl.baseValue + s - 10) / 2);
        }
    }

    _prepareCharacterData(actorData) {

    }
}
import {effective_modifiers} from "../modifiers.js"
import {SRD35E} from "../config.js";

export class ItemSRD35E extends Item {

    prepareBaseData() {
        super.prepareBaseData();
    }

    prepareData() {
        super.prepareData();
        switch(this.data.type) {
            case 'race' :  this._prepareRaceData(this.data);
        }
    }

    prepareDerivedData() {
    }

    _prepareRaceData(raceData) {
        const data = raceData.data;
    }

    async updateEmbeddedEntity(embeddedName, data, options = {}) {
        if (embeddedName === 'ActiveEffect') {
            return await super.updateEmbeddedEntity(embeddedName, data, options);
        }
    }
}
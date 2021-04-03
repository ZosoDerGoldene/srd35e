import {SRD35E} from "./config.js";

export class SRD35EActiveEffectConfig extends ActiveEffectConfig {
    get name() {
        return 'SRD35E.ActiveEffectConfig';
    }

    get template() {
        return 'systems/srd35e/templates/effects/effects_sheet.html';
    }

    getData(options) {
        let data = super.getData(options);
        data.modifierTypes = new Object();
        for (let key of Object.keys(SRD35E.modifierTypes)) {
            data.modifierTypes[key.toString()] = key.toString();
        }
        data.modifierType = this.object.data.flags.modifierType;
        return data;
    }
}
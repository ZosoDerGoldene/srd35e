import {SRD35E} from "../../config.js";

export class ItemSheetSRD35ERace extends ItemSheet {
    static get defaultOptions() {
        return mergeObject(
            super.defaultOptions,
            {
                classes: ['srd35e', 'sheet', 'item', 'race'],
                width: 725,
                height: 840
            });
    }

    static get name() {
        return 'SRD35E.RaceSheet';
    }

    get template() {
        return 'systems/srd35e/templates/items/race_sheet.html';
    }

    activateListeners(html) {
        super.activateListeners(html);
        if (this.isEditable) {
            html.find('.effect-control').click(ev => {
                this.onManageActiveEffect(ev, this.item)
            });
        }
    }

    getData() {
        let data = super.getData();
        data.effects = this.item.effects;
        data.modifierTypes = Object.keys(SRD35E.modifierTypes);
        return data;
    }

    async onManageActiveEffect(event, owner) {
        event.preventDefault();
        const a = event.currentTarget;
        const li = a.closest("li");
        const effect = li?.dataset.effectId ? owner.effects.get(li.dataset.effectId) : null;
        switch ( a.dataset.action ) {
            case 'create': {
                let activeEffect = ActiveEffect.create({'label': 'New Effect', 'flags' : {'modifierType': 'racial'}}, owner);
                let ae = await activeEffect.create({});
                let eff = await owner.effects.get(ae._id);
                return eff.sheet.render(true);
            }
            case 'edit':
                return effect.sheet.render(true);
            case 'delete':
                return effect.delete();
            case 'toggle':
                return effect.update({disabled: !effect.data.disabled});
        }
    }

}
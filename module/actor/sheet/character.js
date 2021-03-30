export class ActorSheet_SRD35E_Character extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(
            super.defaultOptions,
            {
                classes: ["srd35e", "sheet", "actor", "character"],
                width: 725,
                height: 840,
                scrollY: [".tab.details"],
                tabs: [{navSelector: ".tabs", contentSelector: ".sheet-body", initial: "description"}]
            });
    }

    static get name() {
        return "SRD35E.CharacterSheet";
    }

    get template() {
        return "systems/srd35e/templates/actors/character_sheet.html";
    }

    activateListeners(html) {
        super.activateListeners(html);
        if (this.isEditable) {
            html.find(".effect-control").click(ev => {
                this.onManageActiveEffect(ev, this.actor)
            });
        }
    }

    async onManageActiveEffect(event, owner) {
        event.preventDefault();
        console.log("hit");
        let activeEffect = ActiveEffect.create({"label": "New Effect"}, owner);
        //let ae = await this.entity.createEmbeddedEntity('ActiveEffect', activeEffect.data);
        let ae = await activeEffect.create({});
        let effect = await owner.effects.get(ae._id);
        effect.sheet.render(true);
    }
}
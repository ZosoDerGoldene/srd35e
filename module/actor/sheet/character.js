export class ActorSheet_SRD35E_Character extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(
            super.defaultOptions,
            {
                width: 725,
                height: 840
            });
    }

    static get name() {
        return "SRD35E.CharacterSheet";
    }

    get template() {
        return "systems/srd35e/templates/actors/character_sheet.html";
    }
}
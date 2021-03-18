import {ActorSheet_SRD35E_Character} from "./module/actor/sheet/character";

Hooks.once("init", async function() {
    game.srd35e = {
        applications: {
            ActorSheet_SRD35E_Character
        }
    }
    console.log("Initializing SRD 3.5e\n");
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("SRD35E", ActorSheet_SRD35E_Character, { types: ["character"], makeDefault: true });
});
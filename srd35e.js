import {ActorSheet_SRD35E_Character} from "./module/actor/sheet/character.js";
import {ActorSRD35E} from "./module/actor/entity.js"
var Zoso_ASCII = "  ______                  _____ _____  _____    ____   _____  \n" +
                 " |___  /                 / ____|  __ \\|  __ \\  |___ \\ | ____| \n" +
                 "    / / ___  ___  ___   | (___ | |__) | |  | |   __) || |__   ___ \n" +
                 "   / / / _ \\/ __|/ _ \\   \\___ \\|  _  /| |  | |  |__ < |___ \\ / _ \\ \n" +
                 "  / /_| (_) \\__ \\ (_) |  ____) | | \\ \\| |__| |  ___) | ___) |  __/ \n"+
                 " /_____\\___/|___/\\___/  |_____/|_|  \\_\\_____/  |____(_)____/ \\___| \n"+
                 " ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n";

Hooks.once("init", async function() {
    game.srd35e = {
        applications: {
            ActorSheet_SRD35E_Character
        },
        entities: {
            ActorSRD35E
        }

    }
    CONFIG.Actor.entityClass = ActorSRD35E;
    console.log("Initializing SRD 3.5e\n"+Zoso_ASCII);
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("SRD35E", ActorSheet_SRD35E_Character, { types: ["character"], makeDefault: true });
});
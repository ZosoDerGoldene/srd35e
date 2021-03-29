import {ActorSheet_SRD35E_Character} from "./module/actor/sheet/character.js";
import {ActorSRD35E} from "./module/actor/entity.js"
import {ItemSRD35E} from "./module/item/entity.js";

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
    console.log("Initializing SRD 3.5e\n"+Zoso_ASCII);
    CONFIG.Actor.entityClass = ActorSRD35E;
    CONFIG.Item.entityClass = ItemSRD35E;
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("SRD35E", ActorSheet_SRD35E_Character, { types: ["character"], makeDefault: true });
});

Hooks.on("createOwnedItem", async function(parent, item, options, userId) {
    if (item.type === 'race') {
        let otherRaces = parent.items.filter((i) => i.type === 'race' && (i._id != item._id));
        for (let i of otherRaces) {
            // There can only be one
            await parent.deleteOwnedItem(i._id);
        }
    }
});

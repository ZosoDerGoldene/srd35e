import {ActorSheetSRD35ECharacter} from "./module/actor/sheet/character.js";
import {ActorSRD35E} from "./module/actor/entity.js"
import {ItemSRD35E} from "./module/item/entity.js";
import {ItemSheetSRD35ERace} from "./module/item/sheet/race.js";

var Zoso_ASCII = "  ______                  _____ _____  _____    ____   _____  \n" +
                 " |___  /                 / ____|  __ \\|  __ \\  |___ \\ | ____| \n" +
                 "    / / ___  ___  ___   | (___ | |__) | |  | |   __) || |__   ___ \n" +
                 "   / / / _ \\/ __|/ _ \\   \\___ \\|  _  /| |  | |  |__ < |___ \\ / _ \\ \n" +
                 "  / /_| (_) \\__ \\ (_) |  ____) | | \\ \\| |__| |  ___) | ___) |  __/ \n"+
                 " /_____\\___/|___/\\___/  |_____/|_|  \\_\\_____/  |____(_)____/ \\___| \n"+
                 " ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n";

Hooks.once('init', async function() {
    game.srd35e = {
        applications: {
            ActorSheet_SRD35E_Character: ActorSheetSRD35ECharacter
        },
        entities: {
            ActorSRD35E
        }

    }
    console.log("Initializing SRD 3.5e\n"+Zoso_ASCII);
    CONFIG.Actor.entityClass = ActorSRD35E;
    CONFIG.Item.entityClass = ItemSRD35E;
    Actors.unregisterSheet('core', ActorSheet);
    Actors.registerSheet('SRD35E', ActorSheetSRD35ECharacter, { types: ['character'], makeDefault: true });
    Items.unregisterSheet('core', ItemSheet);
    Items.registerSheet('SRD35E', ItemSheetSRD35ERace, { types: ['race'], makeDefault: true });
});

Hooks.on('applyActiveEffect', (actor, change) => {
    let property = getProperty(actor.data.data, change.key);
    let modifier = new Object();
    modifier.modifierType = change.effect.data.flags.modifierType;
    modifier.source = change.effect.data.flags.source;
    modifier.value = change.value;
    property.modifiers.push(modifier);
});

Hooks.on('updateActiveEffect', (entity,data,options,userId) => {
    // Nothing to do here currently;
});

Hooks.on('createActiveEffect', (entity, data, options, userId) => {
    // Log the source of this effect for later use e.g. in modifiers pushed to actors.
    if (!data.flags.source) {
        data.flags.source = data._id;
    }
});

Hooks.on('updateItem', (x,y,z) => {
    console.log(x);
    console.log(y);
    console.log(z);
});

Hooks.on('createOwnedItem', async function(parent, item, options, userId) {
    if (item.type === 'race') {
        let otherRaces = parent.items.filter((i) => i.type === 'race' && (i._id != item._id));
        for (let i of otherRaces) {
            // There can only be one
            await parent.deleteOwnedItem(i._id);
        }
    }
});

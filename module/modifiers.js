import {SRD35E} from "./config.js";

export function effective_modifiers(modifiers, data, modifierFilter) {
    // There are only going to be a handful of modifiers at any time, so a flat array is going to beat a hastable
    let status = {"value": 0, "seen" : [], "data" : data};
    modifiers?.forEach((modifier) => {
        if (modifier.definition) modifier.value = getProperty(status.data, modifier.definition);
        modifier.isBonus = (modifier.value > 0);
    });
    modifiers?.filter(modifierFilter === undefined ?  () => true : modifierFilter).reduce(_calc_effective_modifiers, status);
    return status.value;
}

function _calc_effective_modifiers(status, modifier) {
    let value = modifier.value;
    let isBonus = modifier.isBonus;
    let list = status.seen?.filter(item => (item.modifierType === modifier.modifierType) && ((item.value * value) > 0));

    if (SRD35E.modifierTypes[modifier.modifierType] === undefined) {
        console.log("undefined modifier type: "+modifier.modifierType);
        return status;
    } else {
        if (SRD35E.modifierTypes[modifier.modifierType].bonusOnly && (value < 0)) {
            console.log("encountered penalty of type "+modifier.modifierType+"; disregarding");
            return status;
        }
    }

    if (modifier.stacks || SRD35E.modifierTypes[modifier.modifierType].stacks) {
        let testSet = list?.filter(item => item.source === modifier.source);
        if (testSet && (testSet.length > 0)) {
            // There are already effects from the same source at work
            // So the question is whether the value of the current one is greater than the existing ones
            status.value += isBonus ?
                Math.max(value - Math.max(testSet.map(x => x.value)), 0) :
                Math.min(value - Math.min(testSet.map(x => x.value)), 0);
        } else {
            // No effect from the same source & everything stacks => add the value
            status.value += value;
            // Record the application of the modifier
        }
    } else {
        // This does not stack modifier/modifierType doesn't stack
        // -> find the extremum of already applied modifiers
        status.value += isBonus ?
            Math.max(value - Math.max(list.map(x => x.value)), 0) :
            Math.min(value - Math.min(list.map(x => x.value)), 0);
    }
    status.seen.push(modifier);
    return status;
}
// TODO: Make modifierTypes SRD specific
var modifierTypes = {
    "unnamed" : {
        "stacks" : true
    },
    "alchemical" : {
        "stacks" : false
    },
    "armor" : {
        "stacks" : false
    },
    "circumstance" : {
        "stacks" : true
    },
    "competence" : {
        "stacks" : false
    },
    "deflection" : {
        "stacks" : false
    },
    "dodge" : {
        "stacks" : true
    },
    "enhancement" : {
        "stacks" : false
    },
    "insight" : {
        "stacks" : false
    },
    "luck" : {
        "stacks" : false
    },
    "morale" : { // TODO: Morale bonuses do not apply to nonintelligent creatures
        "stacks" : false
    },
    "natural armor" : {
        "stacks" : false
    },
    "profane" : {
        "stacks" : false
    },
    "racial" : {
        "stacks" : false
    },
    "resistance" : {
        "stacks" : false
    },
    "sacred" : {
        "stacks" : false
    },
    "shield" : {
        "stacks" : false
    },
    "size" : {
        "stacks" : false
    }
}

export function calculate_effective_modifiers(modifiers) {
    // There are only going to be a handful of modifiers at any time, so a flat array is going to beat a hastable
    let status = {"value": 0, "seen" : []};
    modifiers?.reduce(_calc_effective_modifiers, status);
    return status.value;
}

function _calc_effective_modifiers(status, modifier) {
    let isBonus = (modifier.value > 0);
    let list = status.seen?.filter(item => (item.modifierType === modifier.modifierType) && ((item.value * modifier.value) > 0));
    // TODO: Check whether modifierTypes contains the modifierType
    if (modifierTypes[modifier.modifierType] === undefined) {
        console.log("undefined modifier type: "+modifier.modifierType);
        return 0;
    }
    if (modifier.stacks || modifierTypes[modifier.modifierType].stacks) {
        let testSet = list?.filter(item => item.source === modifier.source);
        if (testSet && (testSet.length > 0)) {
            // There are already effects from the same source at work
            // So the question is whether the value of the current one is greater than the existing ones
            status.value += isBonus ?
                Math.max(modifier.value - Math.max(testSet.map (x => x.value)), 0) :
                Math.min(modifier.value - Math.min(testSet.map (x => x.value)), 0);
        } else {
            // No effect from the same source & everything stacks => add the value
            status.value += modifier.value;
            // Record the application of the modifier
        }
    } else {
        // This does not stack modifier/modifierType doesn't stack
        // -> find the extremum of already applied modifiers
        status.value += isBonus ?
            Math.max(modifier.value - Math.max(list.map (x => x.value)), 0) :
            Math.min(modifier.value - Math.min(list.map (x => x.value)), 0);
    }
    status.seen.push(modifier);
    return status;
}
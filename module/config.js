export const SRD35E = {};

SRD35E.abilities = {
    "str" : "SRD35E.ABILITY_STR",
    "dex" : "SRD35E.ABILITY_DEX",
    "con" : "SRD35E.ABILITY_CON",
    "int" : "SRD35E.ABILITY_INT",
    "wis" : "SRD35E.ABILITY_WIS",
    "cha" : "SRD35E.ABILITY_CHA",
}

SRD35E.abilities_tla = {
    "str" : "SRD35E.ABILITY_STR_TLA",
    "dex" : "SRD35E.ABILITY_DEX_TLA",
    "con" : "SRD35E.ABILITY_CON_TLA",
    "int" : "SRD35E.ABILITY_INT_TLA",
    "wis" : "SRD35E.ABILITY_WIS_TLA",
    "cha" : "SRD35E.ABILITY_CHA_TLA",
}

SRD35E.modifierTypes = {
    "unnamed" : {
        "stacks" : true,
        "bonusOnly" : false
    },
    "ability" : {
        "stacks" : false,
        "bonusOnly" : false
    },
    "alchemical" : {
        "stacks" : false,
        "bonusOnly" : true
    },
    "armor" : {
        "stacks" : false,
        "bonusOnly" : true
    },
    "circumstance" : {
        "stacks" : true,
        "bonusOnly" : false
    },
    "competence" : {
        "stacks" : false,
        "bonusOnly" : false
    },
    "deflection" : {
        "stacks" : false,
        "bonusOnly" : true
    },
    "dodge" : {
        "stacks" : true,
        "bonusOnly" : true
    },
    "enhancement" : {
        "stacks" : false,
        "bonusOnly" : true
    },
    "insight" : {
        "stacks" : false,
        "bonusOnly" : true
    },
    "luck" : {
        "stacks" : false,
        "bonusOnly" : false
    },
    "morale" : { // TODO: Morale bonuses do not apply to nonintelligent creatures
        "stacks" : false,
        "bonusOnly" : false
    },
    "natural armor" : {
        "stacks" : false,
        "bonusOnly" : true
    },
    "profane" : {
        "stacks" : false,
        "bonusOnly" : false
    },
    "racial" : {
        "stacks" : false,
        "bonusOnly" : false
    },
    "resistance" : {
        "stacks" : false,
        "bonusOnly" : true
    },
    "sacred" : {
        "stacks" : false,
        "bonusOnly" : false
    },
    "shield" : {
        "stacks" : false,
        "bonusOnly" : true
    },
    "size" : {
        "stacks" : false,
        "bonusOnly" : false
    }
}

SRD35E.modiferTargets = [
    "attribute.ac",
    "ability.str",
    "ability.dex",
    "ability.con",
    "ability.int",
    "ability.wis",
    "ability.cha"
]
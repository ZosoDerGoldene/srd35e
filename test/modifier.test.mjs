import {effective_modifiers} from "../module/modifiers.js";
import assert from "assert"
describe('basic modifier test', () => {
    it('empty list of modifiers', () => {
        assert.strictEqual(effective_modifiers(
            []),
            0);
    });
    it('enhancement bonus', () => {
        assert.strictEqual(effective_modifiers(
            [{"value": 2, "modifierType" : "enhancement"}]),
            2);
    })
    it('unknown modifier type', () => {
        assert.strictEqual(effective_modifiers(
            [{"value": 2, "modifierType" : "grzlwimpf"}]),
            0);
    })
    it('profane penalty', () => {
        assert.strictEqual(effective_modifiers(
            [{"value": -2, "modifierType" : "profane"}]),
            -2);
    })
    it('profane modifiers', () => {
        assert.strictEqual(effective_modifiers(
            [{"value": -2, "modifierType" : "profane"},
            {"value": 3, "modifierType" : "profane"}]),
            1);
    })
    it('boni non-stacking', () => {
        assert.strictEqual(effective_modifiers(
            [{"value": 2, "modifierType" : "profane"},
            {"value": 3, "modifierType" : "profane"}]),
            3);
    })
    it('penalties non-stacking', () => {
        assert.strictEqual(effective_modifiers(
            [{"value": -3, "modifierType" : "profane"},
            {"value": -2, "modifierType" : "profane"}]),
            -3);
    })
    it('boni stacking (different source)', () => {
        assert.strictEqual(effective_modifiers(
            [{"value": 2, "modifierType" : "unnamed", "source" : 1},
            {"value": 3, "modifierType" : "unnamed", "source": 2}]),
            5);
    })
    it('penalties stacking (different source)', () => {
        assert.strictEqual(effective_modifiers(
            [{"value": -3, "modifierType" : "unnamed", "source" : 1},
            {"value": -2, "modifierType" : "unnamed", "source": 2}]),
            -5);
    })
    it('boni non-stacking (same source)', () => {
        assert.strictEqual(effective_modifiers(
            [{"value": 2, "modifierType" : "unnamed", "source" : 1},
            {"value": 3, "modifierType" : "unnamed", "source": 1}]),
            3);
    })
    it('penalties non-stacking (same source)', () => {
        assert.strictEqual(effective_modifiers(
            [{"value": -3, "modifierType" : "unnamed", "source" : 1},
            {"value": -2, "modifierType" : "unnamed", "source": 1}]),
            -3);
    })
    it('bonus stacking (overriding modifierType stacking)', () => {
        assert.strictEqual(effective_modifiers(
            [{"value": 2, "modifierType" : "shield", "source" : "shield"},
            {"value": 2, "modifierType" : "shield", "stacks": true, "source" : "spell"}]),
            4);
    })
    it('bonus not stacking (overriding modifierType stacking, but same source)', () => {
        assert.strictEqual(effective_modifiers(
            [{"value": 2, "modifierType" : "shield", "source" : "shield"},
            {"value": 2, "modifierType" : "shield", "stacks": true, "source" : "shield"}]),
            2);
    })
    it('penalty with bonus-only modifierType', () => {
        assert.strictEqual(effective_modifiers(
            [{"value": 2, "modifierType" : "unnamed"},
            {"value": -2, "modifierType" : "shield"}]),
            2);
    })
    it('complex example', () => {
        assert.strictEqual(effective_modifiers(
            [{"value": 2, "modifierType" : "unnamed", "source" : "shield"},
                {"value": 3, "modifierType" : "unnamed", "source" : "shield"},
                {"value": 2, "modifierType" : "unnamed", "source" : "spell"},
                {"value": -4, "modifierType" : "unnamed", "source" : "shield"},
                {"value": 2, "modifierType" : "shield", "source" : "shield"},
                {"value": -6, "modifierType" : "shield", "source" : "shield"},
                {"value": 2, "modifierType" : "shield", "stacks": true, "source" : "shield"},
                {"value": 2, "modifierType" : "shield", "stacks": true, "source" : "spell"},
                {"value": 5, "modifierType" : "alchemical", "source" : "potion"},
            ]), 10);
    })
});

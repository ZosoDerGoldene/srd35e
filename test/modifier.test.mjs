import {calculate_effective_modifiers} from "../module/modifiers.js";
import assert from "assert"
describe('basic modifier test', () => {
    it('empty list of modifiers', () => {
        assert.strictEqual(calculate_effective_modifiers([]), 0);
    });
    it('enhancement bonus', () => {
        assert.strictEqual(calculate_effective_modifiers([{"value": 2, "modifierType" : "enhancement"}]), 2);
    })
    it('unknown modifier type', () => {
        assert.strictEqual(calculate_effective_modifiers([{"value": 2, "modifierType" : "grzlwimpf"}]),0);
    })
    it('profane penalty', () => {
        assert.strictEqual(calculate_effective_modifiers([{"value": -2, "modifierType" : "profane"}]), -2);
    })
    it('profane modifiers', () => {
        assert.strictEqual(calculate_effective_modifiers([{"value": -2, "modifierType" : "profane"}, {"value": 3, "modifierType" : "profane"}]), 1);
    })
    it('boni non-stacking', () => {
        assert.strictEqual(calculate_effective_modifiers([{"value": 2, "modifierType" : "profane"}, {"value": 3, "modifierType" : "profane"}]), 3);
    })
    it('penalties non-stacking', () => {
        assert.strictEqual(calculate_effective_modifiers([{"value": -3, "modifierType" : "profane"}, {"value": -2, "modifierType" : "profane"}]), -3);
    })
    it('boni stacking (different source)', () => {
        assert.strictEqual(calculate_effective_modifiers([{"value": 2, "modifierType" : "unnamed", "source" : 1}, {"value": 3, "modifierType" : "unnamed", "source": 2}]), 5);
    })
    it('penalties stacking (different source)', () => {
        assert.strictEqual(calculate_effective_modifiers([{"value": -3, "modifierType" : "unnamed", "source" : 1}, {"value": -2, "modifierType" : "unnamed", "source": 2}]), -5);
    })
    it('boni non-stacking (same source)', () => {
        assert.strictEqual(calculate_effective_modifiers([{"value": 2, "modifierType" : "unnamed", "source" : 1}, {"value": 3, "modifierType" : "unnamed", "source": 1}]), 3);
    })
    it('penalties non-stacking (same source)', () => {
        assert.strictEqual(calculate_effective_modifiers([{"value": -3, "modifierType" : "unnamed", "source" : 1}, {"value": -2, "modifierType" : "unnamed", "source": 1}]), -3);
    })
});

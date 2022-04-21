"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plan = void 0;
const eventemitter3_1 = __importDefault(require("eventemitter3"));
class Plan {
    constructor(plan) {
        var _a, _b;
        this.executing = false;
        this.executed = false;
        this.failed = false;
        this.promise = plan.promise;
        this.steps = (_a = plan.steps) !== null && _a !== void 0 ? _a : [];
        this.eventEmitter = (_b = plan.eventEmitter) !== null && _b !== void 0 ? _b : new eventemitter3_1.default();
    }
    static make() {
        return new Plan({
            promise: (initialState) => __awaiter(this, void 0, void 0, function* () { return initialState; }),
        });
    }
    addStep(stepOrName, stepHandler, stepOptions) {
        const { newStep, handler } = Plan.parseInputStep(stepOrName, stepHandler, stepOptions);
        const promise = (initialState, plan) => __awaiter(this, void 0, void 0, function* () {
            let state;
            try {
                state = yield this.promise(initialState, plan);
            }
            catch (error) {
                Plan.changeStepStatus(plan, newStep, 'canceled');
                throw error;
            }
            return Plan.processStep(plan, state, newStep, handler);
        });
        return new Plan({
            promise,
            steps: [...this.steps, newStep],
            eventEmitter: this.eventEmitter,
        });
    }
    prependStep(stepOrName, stepHandler, stepOptions) {
        const { newStep, handler } = Plan.parseInputStep(stepOrName, stepHandler, stepOptions);
        const promise = (newInitialState, plan) => __awaiter(this, void 0, void 0, function* () {
            let initialState;
            try {
                initialState = yield Plan.processStep(plan, newInitialState, newStep, handler);
            }
            catch (error) {
                this.steps.forEach((step) => Plan.changeStepStatus(plan, step, 'canceled'));
                throw error;
            }
            return this.promise(initialState, plan);
        });
        return new Plan({
            promise,
            steps: [newStep, ...this.steps],
            eventEmitter: this.eventEmitter,
        });
    }
    onChange(listener) {
        this.eventEmitter.addListener('change', listener);
        return this;
    }
    getSteps() {
        return this.steps;
    }
    getVisibleSteps() {
        return this.steps.filter((step) => !step.hidden);
    }
    execute(initialState) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.executing = true;
                this.executed = false;
                this.failed = false;
                const state = initialState !== null && initialState !== void 0 ? initialState : undefined;
                return yield this.promise(state, this);
            }
            catch (error) {
                this.failed = true;
                throw error;
            }
            finally {
                this.executing = false;
                this.executed = true;
            }
        });
    }
    static parseInputStep(stepOrName, stepHandler, stepOptions) {
        var _a, _b;
        let inputStep;
        if (typeof stepOrName === 'string') {
            if (!stepHandler) {
                throw new TypeError('Missing step handler');
            }
            inputStep = Object.assign({ name: stepOrName, handler: stepHandler }, stepOptions);
        }
        else {
            inputStep = stepOrName;
        }
        const { handler } = inputStep;
        const newStep = {
            name: inputStep.name,
            status: 'pending',
            hidden: (_a = inputStep.hidden) !== null && _a !== void 0 ? _a : false,
            optional: (_b = inputStep.optional) !== null && _b !== void 0 ? _b : false,
            onError: inputStep.onError,
        };
        return { newStep, handler };
    }
    static processStep(plan, from, step, handler) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.changeStepStatus(plan, step, 'running');
            try {
                const to = yield handler(from, plan);
                this.changeStepStatus(plan, step, 'successful');
                return to;
            }
            catch (error) {
                this.changeStepStatus(plan, step, 'failed');
                (_a = step.onError) === null || _a === void 0 ? void 0 : _a.call(step, error);
                if (step.optional) {
                    // If a step is optional, it's destination state should match
                    // the source state. Otherwise, steps cannot be composed.
                    return from;
                }
                else {
                    throw error;
                }
            }
        });
    }
    static notifyChange(plan, step) {
        plan.eventEmitter.emit('change', step, plan);
    }
    static changeStepStatus(plan, step, newStatus) {
        step.status = newStatus;
        this.notifyChange(plan, step);
    }
}
exports.Plan = Plan;
//# sourceMappingURL=Plan.js.map
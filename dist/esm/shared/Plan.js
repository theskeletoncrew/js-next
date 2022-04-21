import EventEmitter from 'eventemitter3';
export class Plan {
    constructor(plan) {
        this.executing = false;
        this.executed = false;
        this.failed = false;
        this.promise = plan.promise;
        this.steps = plan.steps ?? [];
        this.eventEmitter = plan.eventEmitter ?? new EventEmitter();
    }
    static make() {
        return new Plan({
            promise: async (initialState) => initialState,
        });
    }
    addStep(stepOrName, stepHandler, stepOptions) {
        const { newStep, handler } = Plan.parseInputStep(stepOrName, stepHandler, stepOptions);
        const promise = async (initialState, plan) => {
            let state;
            try {
                state = await this.promise(initialState, plan);
            }
            catch (error) {
                Plan.changeStepStatus(plan, newStep, 'canceled');
                throw error;
            }
            return Plan.processStep(plan, state, newStep, handler);
        };
        return new Plan({
            promise,
            steps: [...this.steps, newStep],
            eventEmitter: this.eventEmitter,
        });
    }
    prependStep(stepOrName, stepHandler, stepOptions) {
        const { newStep, handler } = Plan.parseInputStep(stepOrName, stepHandler, stepOptions);
        const promise = async (newInitialState, plan) => {
            let initialState;
            try {
                initialState = await Plan.processStep(plan, newInitialState, newStep, handler);
            }
            catch (error) {
                this.steps.forEach((step) => Plan.changeStepStatus(plan, step, 'canceled'));
                throw error;
            }
            return this.promise(initialState, plan);
        };
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
    async execute(initialState) {
        try {
            this.executing = true;
            this.executed = false;
            this.failed = false;
            const state = initialState ?? undefined;
            return await this.promise(state, this);
        }
        catch (error) {
            this.failed = true;
            throw error;
        }
        finally {
            this.executing = false;
            this.executed = true;
        }
    }
    static parseInputStep(stepOrName, stepHandler, stepOptions) {
        let inputStep;
        if (typeof stepOrName === 'string') {
            if (!stepHandler) {
                throw new TypeError('Missing step handler');
            }
            inputStep = {
                name: stepOrName,
                handler: stepHandler,
                ...stepOptions,
            };
        }
        else {
            inputStep = stepOrName;
        }
        const { handler } = inputStep;
        const newStep = {
            name: inputStep.name,
            status: 'pending',
            hidden: inputStep.hidden ?? false,
            optional: inputStep.optional ?? false,
            onError: inputStep.onError,
        };
        return { newStep, handler };
    }
    static async processStep(plan, from, step, handler) {
        this.changeStepStatus(plan, step, 'running');
        try {
            const to = await handler(from, plan);
            this.changeStepStatus(plan, step, 'successful');
            return to;
        }
        catch (error) {
            this.changeStepStatus(plan, step, 'failed');
            step.onError?.(error);
            if (step.optional) {
                // If a step is optional, it's destination state should match
                // the source state. Otherwise, steps cannot be composed.
                return from;
            }
            else {
                throw error;
            }
        }
    }
    static notifyChange(plan, step) {
        plan.eventEmitter.emit('change', step, plan);
    }
    static changeStepStatus(plan, step, newStatus) {
        step.status = newStatus;
        this.notifyChange(plan, step);
    }
}
//# sourceMappingURL=Plan.js.map
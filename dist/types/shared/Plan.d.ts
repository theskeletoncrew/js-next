import EventEmitter from 'eventemitter3';
export declare type StepStatus = 'pending' | 'running' | 'successful' | 'failed' | 'canceled';
export interface Step {
    name: string;
    status: StepStatus;
    hidden: boolean;
    optional: boolean;
    onError?: (error: unknown) => void;
}
export declare type InputStepHandler<From, To> = (state: From, plan: Plan<any, any>) => Promise<To>;
export declare type InputStepOptions = Partial<Omit<Step, 'name' | 'status'>>;
export declare type InputStep<From, To> = Pick<Step, 'name'> & InputStepOptions & {
    handler: InputStepHandler<From, To>;
};
export declare class Plan<I, O> {
    readonly promise: (state: I, plan: Plan<any, any>) => Promise<O>;
    readonly steps: Step[];
    readonly eventEmitter: EventEmitter;
    executing: boolean;
    executed: boolean;
    failed: boolean;
    private constructor();
    static make<T = undefined>(): Plan<T, T>;
    addStep<T>(step: InputStep<O, T>): Plan<I, T>;
    addStep<T>(name: string, handler: InputStepHandler<O, T>, options?: InputStepOptions): Plan<I, T>;
    prependStep<T>(step: InputStep<T, I>): Plan<T, O>;
    prependStep<T>(name: string, handler: InputStepHandler<T, I>, options?: InputStepOptions): Plan<T, O>;
    onChange(listener: (step: Step, plan: Plan<any, any>) => void): this;
    getSteps(): Step[];
    getVisibleSteps(): Step[];
    execute(initialState?: I): Promise<O>;
    private static parseInputStep;
    private static processStep;
    private static notifyChange;
    private static changeStepStatus;
}

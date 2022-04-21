export const useOperation = (key) => {
    const constructor = (input) => {
        return {
            key,
            input,
        };
    };
    constructor.key = key;
    return constructor;
};
//# sourceMappingURL=useOperation.js.map
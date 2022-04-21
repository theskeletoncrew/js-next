"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaplexError = void 0;
class MetaplexError extends Error {
    constructor(input) {
        super(input.problem);
        this.name = 'MetaplexError';
        this.key = `metaplex.errors.${input.key}`;
        this.title = input.title;
        this.problem = input.problem;
        this.solution = input.solution;
        this.source = input.source;
        this.sourceDetails = input.sourceDetails;
        this.cause = input.cause;
        this.message = this.toString(false);
    }
    getCapitalizedSource() {
        if (this.source === 'sdk' || this.source === 'rpc') {
            return this.source.toUpperCase();
        }
        return this.source[0].toUpperCase() + this.source.slice(1);
    }
    getFullSource() {
        const capitalizedSource = this.getCapitalizedSource();
        const sourceDetails = this.sourceDetails ? ` > ${this.sourceDetails}` : '';
        return capitalizedSource + sourceDetails;
    }
    toString(withName = true) {
        const causedBy = this.cause ? `\n\nCaused By: ${this.cause}` : '';
        return ((withName ? `[${this.name}] ` : '') +
            `${this.title}` +
            `\n>> Source: ${this.getFullSource()}` +
            `\n>> Problem: ${this.problem}` +
            `\n>> Solution: ${this.solution}` +
            causedBy +
            '\n');
    }
}
exports.MetaplexError = MetaplexError;
//# sourceMappingURL=MetaplexError.js.map
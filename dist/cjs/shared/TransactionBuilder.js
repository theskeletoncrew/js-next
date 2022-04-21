"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionBuilder = void 0;
const web3_js_1 = require("@solana/web3.js");
class TransactionBuilder {
    constructor(transactionOptions = {}) {
        /** The list of all instructions and their respective signers. */
        this.records = [];
        this.transactionOptions = transactionOptions;
    }
    static make(transactionOptions = {}) {
        return new TransactionBuilder(transactionOptions);
    }
    prepend(...txs) {
        const newRecords = txs.flatMap((tx) => tx instanceof TransactionBuilder ? tx.getRecords() : [tx]);
        this.records = [...newRecords, ...this.records];
        return this;
    }
    append(...txs) {
        const newRecords = txs.flatMap((tx) => tx instanceof TransactionBuilder ? tx.getRecords() : [tx]);
        this.records = [...this.records, ...newRecords];
        return this;
    }
    add(...txs) {
        return this.append(...txs);
    }
    splitUsingKey(key, include = true) {
        const firstBuilder = new TransactionBuilder(this.transactionOptions);
        const secondBuilder = new TransactionBuilder(this.transactionOptions);
        let keyPosition = this.records.findIndex((record) => record.key === key);
        if (keyPosition > -1) {
            keyPosition += include ? 1 : 0;
            firstBuilder.add(...this.records.slice(0, keyPosition));
            firstBuilder.add(...this.records.slice(keyPosition));
        }
        else {
            firstBuilder.add(this);
        }
        return [firstBuilder, secondBuilder];
    }
    splitBeforeKey(key) {
        return this.splitUsingKey(key, false);
    }
    splitAfterKey(key) {
        return this.splitUsingKey(key, true);
    }
    getRecords() {
        return this.records;
    }
    getInstructions() {
        return this.records.map((record) => record.instruction);
    }
    getSigners() {
        return this.records.flatMap((record) => record.signers);
    }
    setTransactionOptions(transactionOptions) {
        this.transactionOptions = transactionOptions;
        return this;
    }
    getTransactionOptions() {
        return this.transactionOptions;
    }
    when(condition, callback) {
        return condition ? callback(this) : this;
    }
    unless(condition, callback) {
        return this.when(!condition, callback);
    }
    toTransaction() {
        const tx = new web3_js_1.Transaction(this.getTransactionOptions());
        tx.add(...this.getInstructions());
        return tx;
    }
}
exports.TransactionBuilder = TransactionBuilder;
//# sourceMappingURL=TransactionBuilder.js.map
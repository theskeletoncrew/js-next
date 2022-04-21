"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
class Account {
    constructor(accountInfo) {
        this.executable = accountInfo.executable;
        this.owner = accountInfo.owner;
        this.lamports = accountInfo.lamports;
        this.data = accountInfo.data;
        this.rentEpoch = accountInfo.rentEpoch;
    }
    static parseAccountInfo(accountInfo, accountData) {
        return new this(Object.assign(Object.assign({}, accountInfo), { data: accountData.fromAccountInfo(accountInfo)[0] }));
    }
}
exports.Account = Account;
//# sourceMappingURL=Account.js.map
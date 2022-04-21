export class Account {
    constructor(accountInfo) {
        this.executable = accountInfo.executable;
        this.owner = accountInfo.owner;
        this.lamports = accountInfo.lamports;
        this.data = accountInfo.data;
        this.rentEpoch = accountInfo.rentEpoch;
    }
    static parseAccountInfo(accountInfo, accountData) {
        return new this({
            ...accountInfo,
            data: accountData.fromAccountInfo(accountInfo)[0],
        });
    }
}
//# sourceMappingURL=Account.js.map
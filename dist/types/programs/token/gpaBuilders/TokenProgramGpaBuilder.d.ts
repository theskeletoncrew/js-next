import { GpaBuilder } from "../../../shared";
import { MintGpaBuilder, TokenGpaBuilder } from '.';
export declare class TokenProgramGpaBuilder extends GpaBuilder {
    mintAccounts(): MintGpaBuilder;
    tokenAccounts(): TokenGpaBuilder;
}

import * as Crypto from 'crypto-js';

export class Sumchecker {
    private type: ChecksumType;
    constructor(type: ChecksumType) {
        this.type = type;
    }
    private createChecker(type: ChecksumType): Crypto.Hash {
        switch (type) {
            case ChecksumType.MD5:
                return Crypto.MD5;
            case ChecksumType.SHA1:
                return Crypto.SHA1;
            case ChecksumType.SHA256:
                return Crypto.SHA256;
            default:
                throw new Error();
        }
    }
    public check(input: string): string {
        const checker = this.createChecker(this.type);
        return checker(input);
    }
}

export type ChecksumType = "MD5" | "SHA1" | "SHA256";
export namespace ChecksumType {
    export const MD5 = 'MD5';
    export const SHA1 = 'SHA1';
    export const SHA256 = 'SHA256';
}


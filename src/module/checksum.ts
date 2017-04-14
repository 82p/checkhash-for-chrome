import * as crypto from 'crypto';
import * as fs from 'fs';
import { Promise } from 'es6-promise';

/**Class for calculate checksum */
export class Sumchecker {
    private _type: ChecksumType;
    constructor(type: ChecksumType) {
        this._type = type;
    }
    private createChecker(type: ChecksumType): crypto.Hash {
        switch (type) {
            case ChecksumType.MD5:
                return crypto.createHash(ChecksumType.MD5.toLowerCase());
            case ChecksumType.SHA1:
                return crypto.createHash(ChecksumType.SHA1.toLowerCase());
            case ChecksumType.SHA256:
                return crypto.createHash(ChecksumType.SHA256.toLowerCase());
            default:
                throw new Error();
        }
    }
    /**
     * return checksum for Promise
     * You can use like below
     *  check(filename).then((checksum) => {use checksum})
     * @param input filepath or ReadStream of file
     */
    public checkfile(input: fs.ReadStream | string): Promise<string> {
        let stream:fs.ReadStream;
        if(typeof(input) == 'string'){
            stream = fs.createReadStream(input);
        }else{
            stream = input;
        }
        return new Promise<string>((resolve: (value: string) => void, reject) => {
            const sum = this.createChecker(this._type);
            try {
                stream.on('data', (data: string) => sum.update(data));
                stream.on('close', () => {
                    resolve(sum.digest('hex'));
                })
            } catch (err) {
                reject(err);
            }
        });
    }

    public checkString(str:string){
        const sum = this.createChecker(this._type);        
        sum.update(str);
        return sum.digest('hex');
    }
}

export type ChecksumType = "MD5" | "SHA1" | "SHA256";
export namespace ChecksumType {
    export const MD5 = 'MD5';
    export const SHA1 = 'SHA1';
    export const SHA256 = 'SHA256';
}


import * as crypto from 'crypto';
import * as fs from 'fs';
import { Promise } from 'es6-promise';

/**Class for calculate checksum */
export class Sumchecker {
    private _alg: HashAlgorithm;
    private isAbort = false;
    /**
     * 
     * @param type HashType
     */
    constructor(alg: HashAlgorithm) {
        this._alg = alg;
    }
    private createChecker(type: HashAlgorithm): crypto.Hash {
        switch (type) {
            case HashAlgorithm.MD5:
                return crypto.createHash(HashAlgorithm.MD5.toLowerCase());
            case HashAlgorithm.SHA1:
                return crypto.createHash(HashAlgorithm.SHA1.toLowerCase());
            case HashAlgorithm.SHA256:
                return crypto.createHash(HashAlgorithm.SHA256.toLowerCase());
            default:
                throw new Error();
        }
    }
    /**
     * Calculate hash and return as Promise
     * 
     * @param input filepath or ReadStream of file
     */
    public checkfile(input: fs.ReadStream | string): Promise<string> {
        this.isAbort = false;
        let stream:fs.ReadStream;
        if(typeof(input) == 'string'){
            stream = fs.createReadStream(input);
        }else{
            stream = input;
        }
        return new Promise<string>((resolve: (value: string) => void, reject:(err:string)=>void) => {
            const sum = this.createChecker(this._alg);
            try {
                stream.on('data', (data: string) => {
                     if(this.isAbort){
                         this.isAbort = false;
                         reject("checksum canceled")
                     }
                     sum.update(data)
                    });
                stream.on('close', () => {
                    resolve(sum.digest('hex'));
                })
            } catch (err) {
                reject(err);
            }
        });
    }
    /**
     * Calculate hash of string
     * 
     * @param str 
     */
    public checkString(str:string){
        const sum = this.createChecker(this._alg);        
        sum.update(str);
        return sum.digest('hex');
    }
    public abort(){
        this.isAbort = true;
    }
}

export type HashAlgorithm = "MD5" | "SHA1" | "SHA256";
export namespace HashAlgorithm {
    export const MD5 = 'MD5';
    export const SHA1 = 'SHA1';
    export const SHA256 = 'SHA256';
}


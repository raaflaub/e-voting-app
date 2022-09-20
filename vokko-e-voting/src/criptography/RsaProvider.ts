import {IRsaParameters} from "./IRsaParameters";
import {AlgorithmType} from "./AlgorithmType";
import {HashType} from "./HashType";
import {IKeyPair} from "./IKeyPair";




export class RsaProvider {

    private _parameters: IRsaParameters;
    private _cryptoKeyPair :  CryptoKeyPair | null;

    constructor(parameters : IRsaParameters | null) {

        this._cryptoKeyPair = null;
        if(parameters != null)
        {
            this._parameters = parameters;
        }
        else
        {
            this._parameters =
                {
                    AlgorithmType : AlgorithmType.RSASS_PKCS1_v1_5,
                    ModulusLength: 2048,
                    publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                    HashType: HashType.SHA256
                };
        }

    }

    public async GenerateKeyPair(): Promise<IKeyPair> {

        const algorithmKeyGen = {
            name: this._parameters.AlgorithmType,
            modulusLength: this._parameters.ModulusLength,
            publicExponent: this._parameters.publicExponent,
            hash: {
                name: this._parameters.HashType
                }
        };

        const keyPair:CryptoKeyPair = await window.crypto.subtle.generateKey(algorithmKeyGen, true, ["sign","verify"]);

        this._cryptoKeyPair = keyPair;

        return {
            PrivateKey: await this.ExportPrivateKey(),
            PublicKey: await this.ExportPublicKey()
        }
    }



    public async ExportPublicKey(): Promise<string> {

        const privateKey:any = await this.exportCryptoKey(this._cryptoKeyPair?.publicKey,"spki");
        return  this.toHexString(new Uint8Array(privateKey));
    }

    public async ExportPrivateKey(): Promise<string> {

        const privateKey:any = await this.exportCryptoKey(this._cryptoKeyPair?.privateKey,"pkcs8");
        return  this.toHexString(new Uint8Array(privateKey));

    }

    public async Sign(message:string):Promise<string> {

        const encoder = new TextEncoder();
        const text = encoder.encode(message);

        const  algorithmSign = { name: this._parameters.AlgorithmType};

        let signature: ArrayBuffer = new ArrayBuffer(0);
        if(this._cryptoKeyPair != null) {
             signature = await window.crypto.subtle.sign(algorithmSign, this._cryptoKeyPair.privateKey, text);
        }

        return this.toHexString(new Uint8Array(signature));

    }

    public async VerifySignature(signature:string,message: string):Promise<boolean> {

        const encoder = new TextEncoder();
        const text = encoder.encode(message);
        const signatureBuffer = encoder.encode(signature);
        let isValid:boolean = false;
        if(this._cryptoKeyPair != null) {
            isValid = await window.crypto.subtle.verify(this._parameters.AlgorithmType, this._cryptoKeyPair.publicKey, signatureBuffer, text);
        }
        return isValid;


    }

    public async ImportKeyPair(keyPair:IKeyPair):Promise<void>{

        const privateKey:CryptoKey = await this.importCryptoKey(keyPair.PrivateKey,"pkcs8");
        const publicKey:CryptoKey = await this.importCryptoKey(keyPair.PublicKey,"spki");
        const cryptoKeyPair:CryptoKeyPair = { privateKey : privateKey,
                                        publicKey : publicKey }
        this._cryptoKeyPair = cryptoKeyPair;
    }


    private async exportCryptoKey(key:any ,type :any): Promise<JsonWebKey> {

        const exportedKey: JsonWebKey = await window.crypto.subtle.exportKey(type,key);
        return exportedKey;
    }

    private async importCryptoKey(key:string,type:"spki"| "pkcs8") :Promise<CryptoKey>
    {
        const binDer:any = this.stringToArrayBuffer(window.atob(key));
        const cryptoKey:CryptoKey =  await window.crypto.subtle.importKey(type,binDer, {name: "RSA-OAEP", hash: "SHA-256"},true,["sign","verify"]);
        return cryptoKey;
    }

    private toHexString(byteArray:Iterable<unknown> | ArrayLike<unknown>): string {
        return Array.from(byteArray, function(byte) {
            // @ts-ignore
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
    }

    private stringToArrayBuffer(string:string):ArrayBuffer
    {
        const buf = new ArrayBuffer(string.length);
        const bufView = new Uint8Array(buf);
        for (let i = 0, strLen = string.length; i < strLen; i++) {
            bufView[i] = string.charCodeAt(i);
        }
        return buf;
    }

}




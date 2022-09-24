import {IRsaParameters} from "./IRsaParameters";
import {AlgorithmType} from "./AlgorithmType";
import {HashType} from "./HashType";
import {IKeyPair} from "./IKeyPair";
const {Crypto} = require('@peculiar/webcrypto');
const { TextEncoder } = require("util");
const crypto2 = require('crypto');



export class RsaProvider {


    private _crypto = new Crypto();


    private _cryptoKeyPair :  CryptoKeyPair | null;

    constructor() {


        this._cryptoKeyPair = null;




    }

    public async GenerateKeyPair(): Promise<IKeyPair> {

        const algorithmKeyGen = {

            name: "RSASSA-PKCS1-v1_5",
            hash: "SHA-256",     // SHA-1, SHA-256, SHA-384, or SHA-512
            publicExponent: new Uint8Array([1, 0, 1]), // 0x03 or 0x010001
            modulusLength: 4096, // 1024, 2048, or 4096
        };




        const keyPair:CryptoKeyPair = await this._crypto.subtle.generateKey(algorithmKeyGen, true, ["sign","verify"]);

        this._cryptoKeyPair = keyPair;

        return {
            PrivateKey: await this.ExportPrivateKey(keyPair.privateKey),
            PublicKey: await this.ExportPublicKey(keyPair.publicKey)
        }
    }



    public async ExportPublicKey(key:CryptoKey):Promise<string> {
        const exported = await this._crypto.subtle.exportKey(
            "spki",
            key
        );
        const exportedAsString = this.ArrayBufferToString(exported);
        const exportedAsBase64 = window.btoa(exportedAsString);

        return exportedAsBase64;

    }

    public async ExportPrivateKey(key:CryptoKey):Promise<string> {
        const exported = await this._crypto.subtle.exportKey(
            "pkcs8",
            key
        );
        const exportedAsString = this.ArrayBufferToString(exported);
        const exportedAsBase64 = window.btoa(exportedAsString);

        return exportedAsBase64;

    }
    public async Sign(message:string):Promise<string> {

        const encoder = new TextEncoder();
        const text = encoder.encode(message);

        const  algorithmSign = { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } }


        const privateKey:CryptoKey = this._cryptoKeyPair?.privateKey!;

        return window.btoa(this.ArrayBufferToString(await this._crypto.subtle.sign(algorithmSign,privateKey , text)));

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

        const privateKey:CryptoKey = await this.importPrivateKey(keyPair.PrivateKey);
        const publicKey:CryptoKey = await this.importPublicKey(keyPair.PublicKey);
        const cryptoKeyPair:CryptoKeyPair = { privateKey : privateKey,
                                        publicKey : publicKey }
        this._cryptoKeyPair = cryptoKeyPair;
    }



    private async importPublicKey(key:string):Promise<CryptoKey> {
        // fetch the part of the PEM string between header and footer
        //const pemHeader = "-----BEGIN PRIVATE KEY-----";
        //const pemFooter = "-----END PRIVATE KEY-----";
        //const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
        // base64 decode the string to get the binary data
        const binaryDerString = window.atob(key);
        // convert from a binary string to an ArrayBuffer
        const binaryDer = this.stringToArrayBuffer(binaryDerString);

        return this._crypto.subtle.importKey(
            "spki",
            binaryDer,
            {
                name: "RSASSA-PKCS1-v1_5",
                hash: "SHA-256",
            },
            true,
            ["verify"]
        );
    }



    private async importPrivateKey(key:string):Promise<CryptoKey> {
        // fetch the part of the PEM string between header and footer
        //const pemHeader = "-----BEGIN PRIVATE KEY-----";
        //const pemFooter = "-----END PRIVATE KEY-----";
        //const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
        // base64 decode the string to get the binary data
        const binaryDerString = window.atob(key);
        // convert from a binary string to an ArrayBuffer
        const binaryDer = this.stringToArrayBuffer(binaryDerString);

        return this._crypto.subtle.importKey(
            "pkcs8",
            binaryDer,
            {
                name: "RSASSA-PKCS1-v1_5",
                hash: "SHA-256",
            },
            true,
            ["sign"]
        );
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

    private ArrayBufferToString(buffer:ArrayBuffer):string {
        // @ts-ignore
        return String.fromCharCode.apply(null, new Uint8Array(buffer));
    }

}




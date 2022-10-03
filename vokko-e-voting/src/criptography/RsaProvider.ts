import {IKeyPair} from "./IKeyPair";




export class RsaProvider {


    private _crypto:Crypto;
    private _textEncoder:TextEncoder;


    private _cryptoKeyPair :  CryptoKeyPair | null;

    constructor(crypto:Crypto,textEncoder:TextEncoder) {


        this._cryptoKeyPair = null;
        this._crypto = crypto;
        this._textEncoder = textEncoder;




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


        const text = this._textEncoder.encode(message);

        const  algorithmSign = { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } }


        const privateKey:CryptoKey = this._cryptoKeyPair?.privateKey!;

        return window.btoa(this.ArrayBufferToString(await this._crypto.subtle.sign(algorithmSign,privateKey , text)));

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




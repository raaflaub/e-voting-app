import {describe, expect, test} from '@jest/globals';
import {RsaProvider} from "./RsaProvider";
import {IKeyPair} from "./IKeyPair";
const {Crypto} = require('@peculiar/webcrypto');
const { TextEncoder } = require("util");



describe('Rsa Provider Tests', () => {




     test('Signing Message', async ()  => {

         const rsaProvider1 = new RsaProvider(new Crypto(),new TextEncoder());

         // @ts-ignore
         const keyPair: IKeyPair = await rsaProvider1.GenerateKeyPair()

         const rsaProvider2 = new RsaProvider(new Crypto(),new TextEncoder());

         const keyPair2:IKeyPair = {
             PrivateKey: "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",
             PublicKey: "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAvHX/q1mOD4P4/UiqtKTr/BATiavJ9CSjWIjMnNH3HAAJVE26RhdMzD9TJ3xE0lcbj8uK4TbCe1/58JnWZ9cUubhJ+85/2kK7K+TwWf5Y43TW6v0GvzEdQnRudVh9RfLAo3J9dUFuEEts6yg0lSRI8QstW60t6zj/UeADHzpaoW3riZjpHuK6gDliA1FNbIHVRa3mcQ7pdz4nE/GuD7JuANg72KOTTj1ckluo771k8CkvXDSAYqKQqQ1FJxbUqcbZ3yPMnkMi7JIYs3x0EnSx5ra1xa68aXS83RMknvNvvDSqFp2knTDIJ+gvMVPfY3wGyZgvy8t+yEUjWz7DUogfRj78EN8sDOp2yizGZsG3o1fBXQd652IrZfIHSstpGOC1BPm1ZBxNei+hzChfbhP1qlMJ9nmVydECNRhbri9zGP0Yff8C8Ew+JjVu75Oa4ffAkdkYng6o9+77mKclj3DyqalwcAER/cS3YPXhfktj+54pEzQtYTLOG3saB/zYGtrBAa+84HRCuxRJiPxAgY737poTWf4Pg9vj6Ish5/PEs6GjbxImGdqah/WYp2MAR39jYGa8m/N/Esfo/A34vd9mh8pMOVXzX1DUoh80LlAR1+rr3NGbvTUHt4ydEmBnv7UIpyJAFgRZfPJZ9Hs9P4mvV6eeNV7w/QEY/oeFuz0MR08CAwEAAQ=="
         };
         await rsaProvider2.ImportKeyPair(keyPair2);

         const signature = await rsaProvider2.Sign("dc4bb03e-6e57-42e0-8828-637172cd9fcddb961a27-f4df-4faa-9f9d-90fa0686d289430786a7-9c28-4bda-bf23-227e34149fa2");


         expect(signature).toBe("hpI91iDF3KfEXXKs25WIg967FBxn8Q7jgBNzhVEy1wqTyvrDmiPrSmDUuDtTXDFVHBl1ECnwcl8ASc7hjkXH9joPbm4eNG5q0iIzzPZHRKRbAGoPyqP1PHinzHFPOutTFyaJqWeO19qpvl5NLvL+rKUX2UNHKRLUGu9t4MnslBItKtFChP32dbADC9CB6WpZx8sD6Y8hDRy39hFclQ3YvXVP3gOqKxQbeEDK6Mz58g2cKddZYzr+A5kUVbzVCwuu6AQaWx9mIMtSSr00zDj3YyHAoLSVT0OOqwzqmvaNXv+siTH5Y2qhwaLVDiAHw3FFeYFGBifeWe4DvUvPC8xKjatyYfFILd5JNyOoI6G+1mm8xu6UDcCU64LoNX8fQTAYIFOBJMCGrBOVFbPmw6yI9Hey21zjWapOj0/x60aPzaws5OCih1LqP+bzeTk5q14liJkDLhjKCX/nCDakJOV/X83ghksht7cEUEX6Vtv+tABuVGtKcyj+JFDUuqGGNL5VPLAHNKmjKAmTo/AWYh1+QJgFXWypTgOrwQLewHDei9BHuVvVUsr+XMJdJfIN+ectCR6ai6ZcHXgHfc4eRkhM4XHnXBg5lYsCwpyuwN+Ss8+IKICOJ/Dc1A6OdX4u2xPvR4JdPP+Rg37SWfSRBMawbad65eeJ43t7fTntwYT+xEM=");
    });
});
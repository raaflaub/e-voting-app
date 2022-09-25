import {AlgorithmType} from "../criptography/AlgorithmType";
import {HashType} from "../criptography/HashType";
import {TextEncoder} from "util";

export interface IRsaParameters {
    Crypto: Crypto;
    TextEncoder: TextEncoder;
    HashType: HashType;

}
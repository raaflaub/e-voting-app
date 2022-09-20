import {AlgorithmType} from "../criptography/AlgorithmType";
import {HashType} from "../criptography/HashType";

export interface IRsaParameters {
    AlgorithmType: AlgorithmType;
    ModulusLength: number;
    publicExponent: Uint8Array;
    HashType: HashType;

}
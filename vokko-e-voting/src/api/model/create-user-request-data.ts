/* tslint:disable */
/* eslint-disable */
/**
 * Vokko
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/**
 * 
 * @export
 * @interface CreateUserRequestData
 */
export interface CreateUserRequestData {
    /**
     * 
     * @type {string}
     * @memberof CreateUserRequestData
     */
    phoneIdentification?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CreateUserRequestData
     */
    lastName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CreateUserRequestData
     */
    firstName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CreateUserRequestData
     */
    email?: string | null;

    publicKey?: string | null;
}

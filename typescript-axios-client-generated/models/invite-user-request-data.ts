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
 * @interface InviteUserRequestData
 */
export interface InviteUserRequestData {
    /**
     * 
     * @type {string}
     * @memberof InviteUserRequestData
     */
    lastName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof InviteUserRequestData
     */
    firstName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof InviteUserRequestData
     */
    email?: string | null;
    /**
     * 
     * @type {string}
     * @memberof InviteUserRequestData
     */
    signature?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof InviteUserRequestData
     */
    expiryDateTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof InviteUserRequestData
     */
    eventTitle?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof InviteUserRequestData
     */
    eventDateAndTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof InviteUserRequestData
     */
    eventId?: string;
}

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
import { Voting } from './voting';
/**
 * 
 * @export
 * @interface PostEventRequestData
 */
export interface PostEventRequestData {
    /**
     * 
     * @type {Date}
     * @memberof PostEventRequestData
     */
    eventDateAndTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof PostEventRequestData
     */
    title?: string | null;
    /**
     * 
     * @type {Array<Voting>}
     * @memberof PostEventRequestData
     */
    motions?: Array<Voting> | null;
}

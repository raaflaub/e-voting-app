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
import { VotingOption } from './voting-option';
/**
 * 
 * @export
 * @interface IVoting
 */
export interface IVoting {
    /**
     * 
     * @type {string}
     * @memberof IVoting
     */
    ownerId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof IVoting
     */
    votingTitle?: string | null;
    /**
     * 
     * @type {string}
     * @memberof IVoting
     */
    description?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof IVoting
     */
    startDate?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof IVoting
     */
    endDate?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof IVoting
     */
    planedStartDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof IVoting
     */
    planedEndDate?: Date;
    /**
     * 
     * @type {number}
     * @memberof IVoting
     */
    timeout?: number;
    /**
     * 
     * @type {Array<VotingOption>}
     * @memberof IVoting
     */
    options?: Array<VotingOption> | null;
    /**
     * 
     * @type {string}
     * @memberof IVoting
     */
    id?: string | null;
    /**
     * 
     * @type {string}
     * @memberof IVoting
     */
    question?: string | null;
}

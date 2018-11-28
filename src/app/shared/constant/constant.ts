import { environment } from '../../../environments/environment';
export class Constant{
    /* ---------------------- code ---------------------*/
    public successCode: number = 0;
    public markSeatDuplicateCode: number = 1004;

    /* ---------------------- timeout ------------------- */
    public timeoutSec: number = 10000;

    /* ----------------------- URL --------------------------*/
    public baseUrl: string = environment.baseUrl;
    public apiTrsUrl: string = '/api/trs/';
    public apiBusUrl: string = '/api/bus/';
    public staticFileBusUrl: string = '/trs/master/';
    // public apiCheckAllowUrl: string = environment.apiGateway + 'checkallowreserve';
    public apiAtkUrl: string = '/api/atk/';
}
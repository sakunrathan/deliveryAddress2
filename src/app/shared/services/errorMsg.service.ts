import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';

import { ErrorCodeModel } from '../models/error/error.model';
import { ErrorMessage } from '../constant/error-message';
import { Constant } from '../constant/constant';

import swal from 'sweetalert2';

@Injectable()
export class ErrorMsgService {

    private const = new Constant;
    private staticURL = this.const.baseUrl + this.const.staticFileBusUrl;
    private staticFile = '.txt';
    private getErrorFileAPI = this.staticURL + 'mst_error_iticket' + this.staticFile;
    private errorCodeModel: ErrorCodeModel[];
    private errorMessage: ErrorMessage = new ErrorMessage;
    private alertSettings: any;
    private errorCode: number = 0;


    constructor(
        private http: Http
    ) { }

    getErrorFile() {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.getErrorFileAPI)
            .timeout(this.const.timeoutSec)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: Response) => {
                return Observable.throw(this.handleError(error));
            });
    }

    getErrorMsg(code) {
        const record = JSON.parse(localStorage.getItem('errorCodeList'));
        if (record != null) {
            this.errorCodeModel = record.value;
            const error = this.errorCodeModel.filter((item) => item.errorID === code + '' || item.vendor_error_id === code + '');
            if (error.length > 0) {
                return error[0].descThai;
            } else {
                return this.errorMessage.unknowException;
            }
        } else {
            this.errorCode = code;
        }
    }

    handleError(error) {
        let err;
        if (error.name == 'TimeoutError') {
            err = { code: 40125 };

        } else {
            err = { code: 99999 };
        }
        return err;
    }

    openSweetAlert(msg) {
        swal({
          title: 'Warning!',
          text: msg,
          type: 'warning',
          confirmButtonText: 'close'
        });
      }
      getErrorFileFromAPI() {
      }
}

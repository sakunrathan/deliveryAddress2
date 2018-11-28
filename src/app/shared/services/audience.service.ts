import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { Constant } from '../../shared/constant/constant';
import { ErrorMsgService } from './errorMsg.service';
import swal from 'sweetalert2';
// import { BuyTicketComponent } from '../../pages/eventTickets/bus/buy-ticket/buy-ticket.component';
import { AudienceInfoModel } from '../models/audienceInfo.model';
import { AudienceInfoQueryModel } from '../models/audienceInfoQuery.model';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';

@Injectable()
export class AudienceService {

  private const = new Constant;
  private apiAtkUrl = this.const.baseUrl + this.const.apiAtkUrl;
  private queryAudienceInfoAPI = this.apiAtkUrl + 'query_audience_info';
  private updateAudienceInfoAPI = this.apiAtkUrl + 'update_audience_info';

  alertSettings: any;

  constructor(
    private http: Http,
    private errorMsgService: ErrorMsgService,
    private router: Router
  ) { }

  queryAudienceInfo(reserveId, nidNo) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = {
      reserveId: reserveId,
      nidNo: nidNo
    };
    return this.http.post(this.queryAudienceInfoAPI, JSON.stringify(body), options)
      .timeout(this.const.timeoutSec)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw(this.handleError(error));
      });
  }

  updateAudienceInfo(audienceInfoQuery: AudienceInfoQueryModel) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = audienceInfoQuery;
    return this.http.post(this.updateAudienceInfoAPI, JSON.stringify(body), options)
      .timeout(this.const.timeoutSec)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw(this.handleError(error));
      });
  }

  handleError(error) {
    let err;
    if (error.name == 'TimeoutError') {
      err = { code: 40125 };
      this.openSweetAlert(this.errorMsgService.getErrorMsg(err.code));
      // this.buyTicketComponent.checkTime();
      this.router.navigate(['']);
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
}

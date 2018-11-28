import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

import { SharedService } from './shared/services/shared-service.service';
import { ErrorMsgService } from './shared/services/errorMsg.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  isShow:boolean = false;
  dateNow: Date;

  show(){
    this.isShow = !this.isShow;
    this.dateNow = new Date();
  }

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private errorMsgService: ErrorMsgService
  ) { }
  paymentChannel: string = 'mobile';
  sub: any;

  ngOnInit() {
    let url = new URL(document.location.href);
    let searchParams = new URLSearchParams(url.search);
    this.sharedService.sendData(searchParams);

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.parent.scroll(0, 0);
    });

    this.getErrorFile();
  }

  getErrorFile() {
    this.errorMsgService.getErrorFileFromAPI();
  }
}

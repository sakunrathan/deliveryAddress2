import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

/* Route */
import { AppRoutingModule } from './app-routing.module';

/* Library */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* Page */
import { AppComponent } from './app.component';
import { AudienceInfoComponent } from './pages/audience-info/audience-info.component';

/* Service */
import { ErrorMsgService } from './shared/services/errorMsg.service';
import { SharedService } from './shared/services/shared-service.service';

/* Directive */
import { CustomDisabledDirective } from './shared/directive/custom-disabled.directive';


import * as $ from 'jquery';

@NgModule({
  declarations: [
    AppComponent,
    CustomDisabledDirective,
    AudienceInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    ErrorMsgService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

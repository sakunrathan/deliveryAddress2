import { Component, OnInit, Input } from '@angular/core';
import { Constant } from '../../shared/constant/constant';
import { ErrorMessage } from '../../shared/constant/error-message';
import { AudienceInfoModel } from '../../shared/models/audienceInfo.model';
import { AudienceInfoQueryModel } from '../../shared/models/audienceInfoQuery.model';
import { ConstMaster } from '../../shared/config/ConstMaster';
import { AudienceService } from '../../shared/services/audience.service';
import { ErrorMsgService } from '../../shared/services/errorMsg.service';
import { NgbModal, NgbModule, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProvinceModel } from '../../shared/models/province.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import swal, { SweetAlertType } from 'sweetalert2';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' })
};
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) { }
}

@Component({
  selector: 'app-audience-info',
  templateUrl: './audience-info.component.html',
  styleUrls: ['./audience-info.component.css'],
  providers: [AudienceService]
})
export class AudienceInfoComponent implements OnInit {
  province: object[];
  amphur: object[];
  tumbon: object[];
  zipcode = [];
  provinceMd: string;
  amphurMd: string;
  tumbonMd: string;
  postCode: string;
  eventName: string;
  round: string;
  zone: string;
  reserveID: string;
  idCard: string;
  addressNo: string;
  name: string;
  village: string;
  VillageNo: string;
  road: string;
  soi: string;
  update: string;
  showDetail = 'F';
  reserveMd: string;
  VillageNoMd: string;
  flageExprieDate: string;
  description: string;
  firstName: string;
  lastName: string;
  isAmphurExecute: boolean = false;
  isTumbonExecute: boolean = false;
  isPostCodeExecute: boolean = false;
  isSaveExecute: boolean = false;
  constructor(
    private audienceService: AudienceService,
    private errorMsgService: ErrorMsgService,
    private modalService: NgbModal,
    private http: HttpClient
  ) { }
  private provinceUrl = ConstMaster.PROVINCE_API.endpoint;
  ngOnInit() {
    this.getProvine().subscribe(response => {
      this.province = response['Province'];
    });
    this.provinceMd = '';
    this.amphurMd = '';
    this.tumbonMd = '';
  }
  changeProvince(pv) {
    this.amphurMd = '';
    this.tumbonMd = '';
    this.postCode = '';
    this.changeAmphur('', '');
    return new Promise((resolve, reject) => {
      this.isAmphurExecute = true;
      this.getProvine().subscribe(response => {
        this.amphur = response['Amphur'].filter(function (returnableObjects) {
          return returnableObjects.provinceCode == pv;
        });
        resolve(this.amphur);
      });
    }).then((res) => {
      this.isAmphurExecute = false;
    });
  }
  changeAmphur(pv, ap) {
    this.postCode = '';
    this.tumbonMd = '';
    return new Promise((resolve, reject) => {
      this.isTumbonExecute = true;
      this.getProvine().subscribe(response => {
        this.tumbon = response['Tumbon'].filter(function (returnableObjects) {
          return returnableObjects.provinceCode == pv && returnableObjects.amphurCode == ap;
        });
        resolve(this.tumbon);
      });
    }).then((res) => {
      this.isTumbonExecute = false;
    });
  }
  changeTumbon() {
    this.postCode = '';
    const pv = $('#provinceId option:selected').text();
    const ap = $('#amphurId option:selected').text();
    const tb = $('#tumbonId option:selected').text();
    if (this.tumbonMd == '' || !this.tumbonMd) {
      this.postCode = '';
    } else {
      return new Promise((resolve, reject) => {
        this.isPostCodeExecute = true;
        this.getProvine().subscribe(response => {
          this.zipcode = response['ZipCode'].filter(function (returnableObjects) {
            return returnableObjects.provinceCode + returnableObjects.amphurCode + returnableObjects.tumbonCode == pv + ap + tb;
          });
          resolve(this.zipcode);
        });
      }).then((res) => {
        this.postCode = this.zipcode[0].postCode;
        this.isPostCodeExecute = false;
      });
    }
  }
  getInsert(): Observable<HttpResponse<Object>> {
    const params = {
      reserveId: this.reserveID,
      cardAddress: String($('#firstNameId').val()) + '|' + String($('#lastNameId').val()) + '|' + String($('#addressNoId').val()),
      buildingName: String($('#nameId').val()),
      villageName: String($('#village').val()),
      villageNo: String($('#VillageNoId').val()),
      road: String($('#roadId').val()),
      soi: String($('#soiId').val()),
      provinceCode: String($('#provinceId').val()),
      tumbonCode: String($('#tumbonId').val()),
      amphurCode: String($('#amphurId').val()),
      zipCode: this.postCode
    };
    console.log(JSON.stringify(params));
    const body = new HttpParams().set('param', JSON.stringify(params));
    return this.http.post<any>(ConstMaster.DELVERY_API.endpointInsertDelivery, body, httpOptions);

  }
  getAddress(reserveId, nidNo): Observable<HttpResponse<Object>> {
    const params = {
      reserveId: reserveId,
      nidNo: nidNo,
    };
    const body = new HttpParams().set('param', JSON.stringify(params));
    return this.http.post<any>(ConstMaster.DELVERY_API.endpointAddress, body, httpOptions);

  }
  callAPIGetInsert() {
    if (this.flageExprieDate == 'Y') {
      this.showPopUp(this.description, 'warning');
    } else if ($('#firstNameId').val() == '') {
      this.showPopUp('กรุณากรอก First name  / ชื่อ', 'warning');
    } else if ($('#lastNameId').val() == '') {
      this.showPopUp('กรุณากรอก Last Name / นามสกุล', 'warning');
    } else if ($('#addressNoId').val() == '') {
      this.showPopUp('กรุณากรอก Address No / บ้านเลขที่', 'warning');
    } else if (this.provinceMd == '' || !this.provinceMd) {
      this.showPopUp('กรุณากรอก Province / จังหวัด', 'warning');
    } else if ($('#amphurId').val() == '' || !$('#amphurId').val()) {
      this.showPopUp('กรุณากรอก District / อำเภอ / เขต', 'warning');
    } else if ($('#tumbonId').val() == '' || !$('#tumbonId').val() ) {
      this.showPopUp('กรุณากรอก City / ตำบล / แขวง', 'warning');
    } else if (this.postCode == '' || !this.postCode) {
      this.showPopUp('กรุณากรอก Postcode / รหัสไปรษณีย์', 'warning');
    } else {
      this.isSaveExecute = true;
      this.getInsert().subscribe(res => {
        if (res['success'] == true && res['code'] == 100 && Object.keys(res['data']).length > 0) {
          this.showPopUp('success', 'success');
          this.update = res['data']['update'];
          this.provinceMd = res['data']['provinceCode'];
          this.amphurMd = res['data']['amphurCode'];
          this.tumbonMd = res['data']['tumbonCode'];
          this.isSaveExecute = false;
          // this.callAPIGetRaceAvailable();
        } else {
          this.isSaveExecute = false;
        }
      }, error => {
        this.isSaveExecute = false;
        this.showPopUp('error', 'error');
      });
    }
  }
  callAPIGetRaceAvailable() {
    this.reserveID = '';
    this.idCard = '';
    this.eventName = '';
    this.round = '';
    this.zone = '';
    this.addressNo = '';
    this.name = '';
    this.village = '';
    this.VillageNo = '';
    this.road = '';
    this.soi = '';
    this.update = '';
    this.amphur = [];
    this.tumbon = [];
    this.provinceMd = '';
    this.amphurMd = '';
    this.postCode = '';
    this.tumbonMd = '';
    this.showDetail = 'F';
    $('#firstNameId').val('');
    $('#lastNameId').val('');
    if ($('#reserveID').val() == '') {
      this.showPopUp('กรุณากรอก Reserve ID', 'warning');
    } else if ($('#idCard').val() == '') {
      this.showPopUp('กรุณากรอก ID Card No / Passport No', 'warning');
    } else {
      this.getAddress(String($('#reserveID').val()), String($('#idCard').val())).subscribe(res => {
        if (res['success'] == true && res['code'] == 100 && Object.keys(res['data']).length > 0) {
          this.reserveID = String($('#reserveID').val());
          this.idCard = String($('#idCard').val());
          const data = res['data'];
          const dataAddress = res['data']['dataAddress'];
          this.flageExprieDate = res['data']['flageExprieDate'];
          this.eventName = data.eventName;
          this.round = data.roundName;
          this.zone = data.zoneName;
          this.name = dataAddress.buildingName;
          this.village = dataAddress.villageName;
          this.VillageNo = dataAddress.villageNo;
          this.road = dataAddress.road;
          this.soi = dataAddress.soi;
          if (dataAddress.provinceCode) {
            this.changeProvince(dataAddress.provinceCode);
            this.changeAmphur(dataAddress.provinceCode, dataAddress.amphurCode);
            this.provinceMd = dataAddress.provinceCode;
            this.amphurMd = dataAddress.amphurCode;
            this.postCode = dataAddress.zipCode;
            this.tumbonMd = dataAddress.tumbonCode;
          }
          if (dataAddress.cardAddress) {
            const cardAddress = String(dataAddress.cardAddress).split('|');
            if (cardAddress.length > 1) {
              this.addressNo = cardAddress[2];
              $('#firstNameId').val(cardAddress[0]);
              $('#lastNameId').val(cardAddress[1]);
            } else {
              this.addressNo = dataAddress.cardAddress;
            }
          }
          this.showDetail = 'T';
          this.description = res['description'];
          if (!this.update) {
            this.update = ''; // un
          } else {
            this.update = dataAddress.update;
          }
          if (this.flageExprieDate == 'Y') {
            if (!dataAddress) {
              this.showDetail = 'F';
              this.showPopUp(res['description'], 'warning');
            }
          }
        } else {
          this.isSaveExecute = false;
          this.showPopUp(res['description'], 'error');
          this.showDetail = 'F';
        }
      }, error => {
        this.isSaveExecute = false;
        this.showPopUp('error', 'error');
        this.showDetail = 'F';
      });

    }
  }
  getProvine(): Observable<ProvinceModel> {
    return this.http.get<ProvinceModel>(this.provinceUrl);
  }
  showPopUp(text: string, alertType: SweetAlertType) {
    swal({
      position: 'center',
      type: alertType,
      text: text
    });
  }
  ClearData() {
    this.reserveID = '';
    this.idCard = '';
    this.eventName = '';
    this.round = '';
    this.zone = '';
    this.addressNo = '';
    this.name = '';
    this.village = '';
    this.VillageNo = '';
    this.road = '';
    this.soi = '';
    this.provinceMd = '';
    this.amphurMd = '';
    this.postCode = '';
    this.tumbonMd = '';
    this.update = '';
    this.amphur = [];
    this.tumbon = [];
    $('#reserveID').val('');
    $('#idCard').val('');
    this.showDetail = 'F';
    $('#firstNameId').val('');
    $('#lastNameId').val('');
  }
  keypressTel(event: any, tel: string) {
    const key = event.which;
    if (typeof (tel) == 'undefined' || tel == '') {
      tel = '';
    }
    if (!(key >= 48 && key <= 57)) { // if not number
      event.preventDefault();
    }

  }
}

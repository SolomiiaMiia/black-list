import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CreateDisproveDossierPageDto } from '../models/createDisproveDossierPageDto';
import { APIService } from '../shared/services/api.service'
import { serialize } from 'object-to-formdata';
import { routingAnimation } from '../shared/animations/routing-animation';
import { SignedData, SignedDataPart } from '../models/signedDataDto';
import { NotifyService } from '../shared/services/notify.service';
import { HistoryService, IHistorySaver } from '../shared/services/history.service';

@Component({
  templateUrl: './disprove-dossier-page.component.html',
  styleUrls: ['./disprove-dossier-page.component.scss'],
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})
export class DisproveDossierPageComponent implements OnInit, IHistorySaver {

  @Input() public dossierForm: FormGroup = new FormGroup({});

  public id: number;
  public submitted: boolean = false;
  public hasFileSizeError:boolean = false;
  private attachtments: File[] = [];
  public requireSign: boolean = false;

  constructor(private fb: FormBuilder,
    private apiService: APIService,
    private route: ActivatedRoute,
    private router: Router,
    private historyService: HistoryService,
    private notificationService: NotifyService  ) {
    this.id = Number(this.route.snapshot.parent?.url.filter(v => !isNaN(Number(v.path)))[0].path);
  }

  getData(): any {
    let dto = <CreateDisproveDossierPageDto>this.dossierForm.value;
    delete dto.attachtments;
    return dto;
  }
  applyData() {
    var historyData = <CreateDisproveDossierPageDto>this.historyService.getHistory(this.historyService.key_AddDisproveDossier);
    if (historyData !== null) {
      this.dossierForm.patchValue(historyData);
    }
  }

  @HostListener('window:popstate', ['$event'])
  @HostListener('window:beforeunload', ['$event'])
  onPopState(event: any) {
    this.historyService.saveHistory(this.historyService.key_AddDisproveDossier, this.getData());
  }

  ngOnInit(): void {
    this.createForm();

    if (window["signProcessor"] == undefined) {
      this.addScripts('/assets/sign.processor.js', () => { window["signProcessor"].Init(); });
    } else {
      window["signProcessor"].Init();
    }

  }

  ngAfterViewInit() {
    this.addScripts('/assets/blank.js', () => { this.applyData(); });
  }

  private addScripts(url: string, callback?: Function) {
    var scriptUrl = url;
    let node = document.createElement('script');
    node.src = scriptUrl;
    node.type = 'text/javascript';
    node.async = false;
    node.defer = true;
    node.charset = 'utf-8';
    node.onload = () => {
      console.log(url + ': script loaded');
      if (callback) callback();
    };
    document.getElementsByTagName('body')[0].appendChild(node);
  }


  private createForm() {
    this.dossierForm = this.fb.group({
      attachtments: this.fb.control(''), //can be multiple attachtments
      text: this.fb.control('', { validators: [Validators.required] }),
      author: this.fb.control('', { validators: [Validators.required] }),
      phone: this.fb.control('', { validators: Validators.pattern(new RegExp('^\\+?3?8?(0[5-9][0-9]\\d{7})$')) }),
      email: this.fb.control('', { validators: [Validators.email] }),
      agreeForData: this.fb.control('', { validators: [Validators.required] }),
      agreeForCriminalLiability: this.fb.control('', { validators: [Validators.required] })
    });

    this.dossierForm.get('agreeForData')?.setValue(false);
  }

  onFileChange(event: any) {
    this.attachtments = [];
    this.hasFileSizeError = false;
      for (var i = 0; i < event.target.files.length; i++) {
        if(event.target.files[i].size > 1024 * 1024 * 50){
          this.hasFileSizeError = true;
          break;
        }
        else{
          this.attachtments.push(event.target.files[i]);
          this.hasFileSizeError = false;
        }
      }
  }

  canSubmit(): boolean {
    return this.dossierForm.get('agreeForData')?.value == true && this.dossierForm.get('agreeForCriminalLiability')?.value == true;
  }

  public submit() {

    this.submitted = true;


    if (this.dossierForm.valid && !this.hasFileSizeError) {
     
      this.requireSign = true;

      window.scroll(0, 0);
    }

  }

  private postData(signedData: SignedData[]) {
    let dto = <CreateDisproveDossierPageDto>this.dossierForm.value;


    const formData = serialize(
      dto
    );

    formData.delete('attachtments');
    Array.from(this.attachtments).map((file) => {
      return formData.append('attachtments', file, file.name);
    });

    Array.from(signedData).map((data) => {
      return formData.append('signAttachtments', data.data, data.name);
    });

    formData.delete('agreeForData');
    formData.delete('agreeForCriminalLiability');

    this.apiService.addDisproveDossier(this.id, formData).subscribe(id => {

      this.historyService.clearHistory(this.historyService.key_AddDisproveDossier);

      const navigationExtras: NavigationExtras = {
        state: {
          isNew: false,
          id: id
        }
      };

      this.router.navigate(['/add-dossier/complete'], navigationExtras);
    });
  }

  @HostListener('window:sign.finished', ['$event'])
  onSignFinished(event: CustomEvent): void {
    let signedData: SignedData[] = [];

    let details = <Array<SignedDataPart>>event.detail;

    Array.from(details).map((item) => {

      const data: SignedData = {
        data: new Blob([item.val], {
          type: 'application/pkcs7-signature'
        }),
        name: item.name + '.p7s',
      };

      signedData.push(data);
    });

    console.log(signedData);

    this.postData(signedData);
  }

  @HostListener('window:sign.readed', ['$event'])
  onSignReaded(event: CustomEvent): void {

    let subjectCN = <string>event.detail.subjCN;

    this.apiService.get(this.id).subscribe(response => {
      let dossierIssuer = `${response.lastName} ${response.firstName} ${response.thirdName}`;

      if (subjectCN.localeCompare(dossierIssuer, 'ua', { sensitivity: 'base' }) == 0) {
        window["signProcessor"].onSign(dossierIssuer+'.txt');
      } else {
        this.requireSign = false;
        window.scroll(0, 0);
        window["signProcessor"].Init();
        this.notificationService.error('Неможливо подати спростування досьє. Дозволяється лише особі, на котру подано досьє');
      }

    });
   
  }

}

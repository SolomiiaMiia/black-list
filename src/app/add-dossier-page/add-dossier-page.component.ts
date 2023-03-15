import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { TagModel } from 'ngx-chips/core/tag-model';
import { serialize } from 'object-to-formdata';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { AddDossierPageDto } from '../models/addDossierPageDto';
import { CorruptorsDto } from '../models/corruptorsDto';
import { SignedData, SignedDataPart } from '../models/signedDataDto';
import { PreviewDossierComponent } from '../preview-dossier/preview-dossier.component';
import { routingAnimation } from '../shared/animations/routing-animation';
import { APIService } from '../shared/services/api.service';
import { HistoryService, IHistorySaver } from '../shared/services/history.service';


@Component({
  templateUrl: './add-dossier-page.component.html',
  styleUrls: ['./add-dossier-page.component.scss'],
  animations: [routingAnimation],
  //host: { '[@routingAnimation]': '' }
})

export class AddDossierPageComponent implements OnInit, IHistorySaver {
  @Input() public dossierForm: FormGroup = new FormGroup({});
  @ViewChild('preview') preview!: PreviewDossierComponent;
  public submitted: boolean = false;
  public isAnonymous: boolean = false;
  public hasFileSizeError: boolean = false;
  private photo: any;
  private attachtments: File[] = [];
  public requireSign: boolean = false; 

  constructor(private fb: FormBuilder,
    private apiService: APIService,
    private route: ActivatedRoute,
    private router: Router,
    private historyService: HistoryService,
    @Inject(DOCUMENT) private document: Document) {
  }

  getData(): any {
    let dto = <AddDossierPageDto>this.dossierForm.value;
    dto.address = this.getAddressInput()?.value;
    delete dto.attachtments;
    delete dto.authorPhoto;
    return dto;
  }
  applyData() {
    var historyData = <AddDossierPageDto>this.historyService.getHistory(this.historyService.key_AddDossier);
    if (historyData !== null) {     
      this.dossierForm.patchValue(historyData);
      this.getAddressInput().value = historyData.address;
    }
  }

  ngOnInit(): void {
    this.isAnonymous = this.route.snapshot.parent?.url.filter(v => v.path == 'anonymous').length == 1;
    this.createForm();
    if (!this.isAnonymous) {
      if (window["signProcessor"] == undefined) {
        this.addScripts('/assets/sign.processor.js', () => { window["signProcessor"].Init(); });
      } else {
        window["signProcessor"].Init();
      }
    }
  }

  public getRelatedDossiers = (text: string): Observable<CorruptorsDto[]> => {
    return this.apiService.searchCorruptors(text);
  };

  public onAddRelatedDossier = (tag: TagModel) => { return of(tag); }

  @HostListener('window:popstate', ['$event'])
  @HostListener('window:beforeunload', ['$event'])
  onPopState(event: any) {
    this.historyService.saveHistory(this.historyService.key_AddDossier, this.getData());
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

  ngAfterViewInit() {
    this.addScripts('/assets/visicom.autocomplete.js', () => { this.applyData(); });   
  }

  private createForm() {
    this.dossierForm = this.fb.group({
      lastName: this.fb.control('', { validators: [Validators.required] }),
      firstName: this.fb.control('', { validators: [Validators.required] }),
      thirdName: this.fb.control('', { validators: [Validators.required] }),
      authorPhoto: this.fb.control(''),
      position: this.fb.control(''),
      placeOfWork: this.fb.control(''),
      address: this.fb.control('', { validators: [Validators.required] }),
      attachtments: this.fb.control(''), //can be multiple attachtments
      text: this.fb.control('', { validators: [Validators.required] }),
      tags: [[], []],
      relatedDossiers: [[], []]
    });

    if (!this.isAnonymous) {
      this.dossierForm.addControl('phone', this.fb.control('', { validators: Validators.pattern(new RegExp('^\\+?3?8?(0[5-9][0-9]\\d{7})$')) }));
      this.dossierForm.addControl('email', this.fb.control('', { validators: [Validators.email] }));
      this.dossierForm.addControl('author', this.fb.control('', { validators: [Validators.required] }));
      this.dossierForm.addControl('agreeForData', this.fb.control('', { validators: [Validators.required] }));
      this.dossierForm.addControl('agreeForContract', this.fb.control('', { validators: [Validators.required] }));
      this.dossierForm.addControl('agreeForCriminalLiability', this.fb.control('', { validators: [Validators.required] }));

      this.dossierForm.get('agreeForData')?.setValue(false);
      this.dossierForm.get('agreeForContract')?.setValue(false);
      this.dossierForm.get('agreeForCriminalLiability')?.setValue(false);
    }
  }

  canSubmit(): boolean {
    return this.isAnonymous ? true : this.dossierForm.get('agreeForData')?.value == true && this.dossierForm.get('agreeForContract')?.value == true
      && this.dossierForm.get('agreeForCriminalLiability')?.value == true;
  }

  checkAddress(): boolean {
    return this.getAddressInput()?.value.length > 0;
  }

  private getAddressInput(): HTMLInputElement {
    return this.document.getElementById('address') as HTMLInputElement;
  }

  onFileChange(event: any, source: 'photo' | 'files') {
    if (source === 'photo') this.photo = event.target.files[0];
    else {
      this.attachtments = [];
      this.hasFileSizeError = false;
      for (var i = 0; i < event.target.files.length; i++) {
        if (event.target.files[i].size > 1024 * 1024 * 50) {
          this.hasFileSizeError = true;
          break;
        }
        else {
          this.attachtments.push(event.target.files[i]);
          this.hasFileSizeError = false;
        }
      }
    }
  }

  public submit() {
    this.preview.dto = <AddDossierPageDto>this.dossierForm.value;
    this.preview.authorPhoto = this.photo?.name;
    this.preview.attachtments = this.attachtments.map(c => c.name);
    this.preview.relatedDossiers = this.dossierForm.get('relatedDossiers')?.value.map((obj: { name: string; }) => obj.name);

    this.submitted = true;
    this.dossierForm.get('address')?.setValue(this.getAddressInput()?.value);

    if (this.dossierForm.valid && !this.hasFileSizeError) {

      if (this.isAnonymous) {

        this.postData();

      } else {

        this.requireSign = true;

        window.scroll(0, 0);
      }
    }
  }

  private postData(signedData?: SignedData[]) {
    let dto = <AddDossierPageDto>this.dossierForm.value;
    dto.isAnonymous = this.isAnonymous;
    var tags = (<Array<string>>this.dossierForm.get('tags')?.value).join('');
    if (tags != '') {
      dto.tags = tags;
    }
    dto.relatedDossiers = this.dossierForm.get('relatedDossiers')?.value.map((obj: { id: number; }) => obj.id);

    const formData = serialize(
      dto
    );

    formData.delete('attachtments');
    formData.set('authorPhoto', this.photo);
    Array.from(this.attachtments).map((file) => {
      return formData.append('attachtments', file, file.name);
    });

    if (signedData != undefined) {
      Array.from(signedData).map((data) => {
        return formData.append('signAttachtments', data.data, data.name);
      });
    }
    formData.delete('agreeForData');
    formData.delete('agreeForContract');
    formData.delete('agreeForCriminalLiability');
    

    this.apiService.addDossier(formData).subscribe(id => {

      this.historyService.clearHistory(this.historyService.key_AddDossier);

      const navigationExtras: NavigationExtras = {
        state: {
          isNew: true,
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
    let dto = <AddDossierPageDto>this.dossierForm.value;
    let dossierName = `${dto.lastName} ${dto.firstName} ${dto.thirdName}.txt`;
    window["signProcessor"].onSign(dossierName);
  }
}


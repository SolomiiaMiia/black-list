import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Input, Inject, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AddDossierPageDto } from '../models/addDossierPageDto';
import { APIService } from '../shared/services/api.service'
import { serialize } from 'object-to-formdata';
import { routingAnimation } from '../shared/animations/routing-animation';
import { SignedData, SignedDataPart } from '../models/signedDataDto';


@Component({
  templateUrl: './add-dossier-page.component.html',
  styleUrls: ['./add-dossier-page.component.scss'],
  animations: [routingAnimation],
  //host: { '[@routingAnimation]': '' }
})

export class AddDossierPageComponent implements OnInit {


  @Input() public dossierForm: FormGroup = new FormGroup({});

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
    @Inject(DOCUMENT) private document: Document) {
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
    this.addScripts('/assets/visicom.autocomplete.js');

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
      attachtments: this.fb.control('', { validators: [Validators.required] }), //can be multiple attachtments
      text: this.fb.control('', { validators: [Validators.required] }),
    });

    if (!this.isAnonymous) {
      this.dossierForm.addControl('phone', this.fb.control('', { validators: Validators.pattern(new RegExp('^\\+?3?8?(0[5-9][0-9]\\d{7})$')) }));
      this.dossierForm.addControl('email', this.fb.control('', { validators: [Validators.email] }));
      this.dossierForm.addControl('author', this.fb.control('', { validators: [Validators.required] }));
      this.dossierForm.addControl('agreeForData', this.fb.control('', { validators: [Validators.required] }));
      this.dossierForm.addControl('agreeForContract', this.fb.control('', { validators: [Validators.required] }));

      this.dossierForm.get('agreeForData')?.setValue(false);
      this.dossierForm.get('agreeForContract')?.setValue(false);
    }
  }

  canSubmit(): boolean {
    return this.isAnonymous ? true : this.dossierForm.get('agreeForData')?.value == true && this.dossierForm.get('agreeForContract')?.value == true;
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
      for (var i = 0; i < event.target.files.length; i++) {
        if (event.target.files[i].size > 1024 * 1024 * 10) {
          this.hasFileSizeError = true;
        }
        else {
          this.attachtments.push(event.target.files[i]);
          this.hasFileSizeError = false;
        }
      }
    }
  }

  public submit() {
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

    this.apiService.addDossier(formData).subscribe(id => {

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
    window["signProcessor"].onSign();
  }

}

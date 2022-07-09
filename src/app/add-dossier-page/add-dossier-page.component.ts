import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AddDossierPageDto } from '../models/addDossierPageDto';
import { APIService } from '../shared/services/api.service'
import { serialize } from 'object-to-formdata';
import { routingAnimation } from '../shared/animations/routing-animation';

@Component({
  templateUrl: './add-dossier-page.component.html',
  styleUrls: ['./add-dossier-page.component.scss'],
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})
export class AddDossierPageComponent implements OnInit {

  @Input() public dossierForm: FormGroup = new FormGroup({});

  public submitted: boolean = false;
  public isAnonymous: boolean = false;
  private photo: any;
  private attachtments: File[] = [];

  constructor(private fb: FormBuilder,
    private apiService: APIService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
    this.isAnonymous = this.route.snapshot.parent?.url.filter(v => v.path == 'anonymous').length == 1;
    this.createForm();
  }

  private addScripts(url: string) {
    var scriptUrl = url;
    let node = document.createElement('script');
    node.src = scriptUrl;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
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
        this.attachtments.push(event.target.files[i]);
      }
    }
  }

  public submit() {

    this.submitted = true;

    this.dossierForm.get('address')?.setValue(this.getAddressInput()?.value);

    if (this.dossierForm.valid) {
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

  }

}

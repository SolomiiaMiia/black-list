import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DossierDto } from '../models/dossierDto';
import { DossierType } from '../models/enums';
import { APIService } from '../shared/services/api.service'
import { AdminService } from '../shared/services/admin.service';
import { serialize } from 'object-to-formdata';
import { NotifyService } from '../shared/services/notify.service';
import { routingAnimation } from '../shared/animations/routing-animation';
import { Observable } from 'rxjs/internal/Observable';
import { CorruptorsDto } from '../models/corruptorsDto';
import { of } from 'rxjs/internal/observable/of';
import { TagModel } from 'ngx-chips/core/tag-model';
import { EditDossierPageDto } from '../models/editDossierPageDto';
import { filter, map } from 'rxjs';



@Component({
  templateUrl: './edit-dossier-page.component.html',
  styleUrls: ['./edit-dossier-page.component.scss'],
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})
export class EditDossierPageComponent implements OnInit {

  public dossierForm: FormGroup = new FormGroup({});
  public DossierTypes = DossierType;

  public submitted: boolean = false;
  public isAnonymous: boolean = true;
  public id: number = 0;
  public dossier: DossierDto = new DossierDto();
  public isSuperAdmin: boolean;
  private photo: any;

  constructor(private fb: FormBuilder,
    private apiService: APIService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    adminService: AdminService,
    private notifyService: NotifyService) {
    this.isSuperAdmin = adminService.isSuperAdmin();
  }

  ngOnInit(): void {
    this.createEditForm();
    this.id = Number(this.route.snapshot.parent?.url.filter(v => !isNaN(Number(v.path)))[0].path);
    this.loadDossier();
  }

  private loadDossier() {
    this.apiService.get(this.id).subscribe(res => {
      this.dossier = res;
    }).add(() => { this.fillDossier(); });
  }

  onFileChange(event: any) {
    this.photo = event.target.files[0];
  }

  public getRelatedDossiers = (text: string): Observable<CorruptorsDto[]> => {
    return this.apiService.searchCorruptors(text).pipe(map(m => m.filter(i => i.id != this.id)));
  };

  public onAddRelatedDossier = (tag: TagModel) => { return of(tag); }

  private fillDossier() {
    this.isAnonymous = this.dossier.isAnonymous;

    this.dossierForm.get('lastName')?.setValue(this.dossier.lastName);
    this.dossierForm.get('firstName')?.setValue(this.dossier.firstName);
    this.dossierForm.get('thirdName')?.setValue(this.dossier.thirdName);

    this.dossierForm.get('position')?.setValue(this.dossier.position);
    this.dossierForm.get('placeOfWork')?.setValue(this.dossier.placeOfWork);
    this.dossierForm.get('address')?.setValue(this.dossier.address);

    this.dossierForm.get('tags')?.setValue(this.dossier.tags);
    this.dossierForm.get('relatedDossiers')?.setValue(this.dossier.relatedDossiers?.map((obj) => Object.assign({ value: obj.id, display: obj.name }, obj)));


    if (!this.isAnonymous) {
      this.dossierForm.addControl('phone', this.fb.control('', { validators: Validators.pattern(new RegExp('^\\+?3?8?(0[5-9][0-9]\\d{7})$')) }));
      this.dossierForm.addControl('email', this.fb.control('', { validators: [Validators.email] }));
      this.dossierForm.addControl('author', this.fb.control('', { validators: [Validators.required] }));

      this.dossierForm.get('phone')?.setValue(this.dossier.phone);
      this.dossierForm.get('email')?.setValue(this.dossier.email);
      this.dossierForm.get('author')?.setValue(this.dossier.author);
    }

    this.getAddressInput().value = this.dossier.address;
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

  private createEditForm() {
    this.dossierForm = this.fb.group({
      lastName: this.fb.control('', { validators: [Validators.required] }),
      firstName: this.fb.control('', { validators: [Validators.required] }),
      thirdName: this.fb.control('', { validators: [Validators.required] }),
      authorPhoto: this.fb.control(''),
      position: this.fb.control(''),
      placeOfWork: this.fb.control(''),
      address: this.fb.control('', { validators: [Validators.required] }),
      tags: [[], []],
      relatedDossiers: [[], []]
    });
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

  public submit(action: 'save' | 'publish' | 'decline') {

    this.submitted = true;

    this.dossierForm.get('address')?.setValue(this.getAddressInput()?.value);

    if (this.dossierForm.valid) {

      let dto = this.dossierForm.value;
      delete dto.author;
      delete dto.email;
      delete dto.phone;

      var tags = (<Array<string>><unknown>dto.tags)?.join('');
      dto.tags = tags == '' ? null : tags;

      dto.relatedDossiers = this.dossierForm.get('relatedDossiers')?.value.map((obj: { id: number; }) => obj.id);

      const formData = serialize(
        dto
      );

      formData.set('authorPhoto', this.photo);

      let confirmText = '';
      let successText = '';
      switch (action) {
        case 'save':
          confirmText = `Зберегти досьє ${this.id}?`;
          successText = `Досьє ${this.id} успішно збережено`;
          break;
        case 'publish':
          confirmText = `Опублікувати досьє ${this.id}?`;
          successText = `Досьє ${this.id} опубліковано`;
          break;
        case 'decline':
          confirmText = `Відхилити досьє ${this.id}?`;
          successText = `Досьє ${this.id} відхилено`;
      }

      if (confirm(confirmText)) {
        this.apiService.editDossier(this.id, formData, action).subscribe(res => {
          this.router.navigate(['/admin/manage']);
          this.notifyService.info(successText);
        });
      }
    }
  }

  public delete() {
    if (confirm(`Видалити досьє ${this.id} назавжди?`)) {
      this.apiService.deleteDossier(this.id).subscribe(res => {
        this.router.navigate(['/admin/manage']);
        this.notifyService.info(`Досьє ${this.id} видалено`);
      });
    }
  }
}

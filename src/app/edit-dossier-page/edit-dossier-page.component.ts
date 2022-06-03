import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { EditDossierPageDto } from '../models/editDossierPageDto';
import { DossierDto } from '../models/dossierDto';
import { DossierStatus, DossierType } from '../models/enums';
import { APIService } from '../shared/services/api.service'
import { FileDto } from '../models/fileDto';
import { AdminService } from '../shared/services/admin.service';

@Component({
  templateUrl: './edit-dossier-page.component.html',
  styleUrls: ['./edit-dossier-page.component.scss']
})
export class EditDossierPageComponent implements OnInit {

  public dossierForm: FormGroup = new FormGroup({});
  public DossierTypes = DossierType;

  public submitted: boolean = false;
  public isAnonymous: boolean = true;
  private id: number = 0;
  public dossier: DossierDto = new DossierDto();
  public isSuperAdmin: boolean;

  constructor(private fb: FormBuilder,
    private apiService: APIService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    adminService: AdminService) {
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
    },
      err => {
        this.dossier = {
          id: 3,
          img: 'assets/images/1.png',
          lastName: 'Садовий',
          firstName: 'Андрій',
          thirdName: 'Іванович',
          position: 'Посада',
          placeOfWork: 'Місце роботи',
          address: `Львів місто Львівська область`,
          text: 'Текст досьє',
          date: new Date,
          status: DossierStatus.New,
          type: DossierType.New,
          isAnonymous: false,
          author: 'Автор',
          phone: '+380982774950',
          email: 'letos009@gmail.com',
          photo: { name: "1.png", url: "assets/images/1.png" },
          dossierFiles: [{ name: "sample.pdf", url: "assets/files/sample.pdf" }, { name: "sample.pdf", url: "assets/files/sample.pdf" },
          { name: "sample.pdf", url: "assets/files/sample.pdf" }]
        } as DossierDto;
      }
    ).add(() => { this.fillDossier(); });
  }

  private fillDossier() {
    this.isAnonymous = this.dossier.isAnonymous;

    this.dossierForm.get('lastName')?.setValue(this.dossier.lastName);
    this.dossierForm.get('firstName')?.setValue(this.dossier.firstName);
    this.dossierForm.get('thirdName')?.setValue(this.dossier.thirdName);

    this.dossierForm.get('position')?.setValue(this.dossier.position);
    this.dossierForm.get('placeOfWork')?.setValue(this.dossier.placeOfWork);
    this.dossierForm.get('address')?.setValue(this.dossier.address);


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
      position: this.fb.control(''),
      placeOfWork: this.fb.control(''),
      address: this.fb.control('', { validators: [Validators.required] }),
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

  public submit(action: string) {

    this.submitted = true;

    this.dossierForm.get('address')?.setValue(this.getAddressInput()?.value);

    if (this.dossierForm.valid) {

      let dto = this.dossierForm.value as EditDossierPageDto;

      console.log(dto);

      this.apiService.editDossier(dto, action).subscribe(res => {

        this.router.navigate(['/admin/manage']);
      }, err => {
        this.router.navigate(['/admin/manage']);
      });

    }

  }

  public delete() {

    if (confirm("Видалити досьє назавжди?")) {

      this.apiService.deleteDossier(this.id).subscribe(res => {

        this.router.navigate(['/admin/manage']);
      }, err => {
        this.router.navigate(['/admin/manage']);
      });

    }

  }

}

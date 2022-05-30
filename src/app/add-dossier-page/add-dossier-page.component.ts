import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { AddDossierPageDto } from '../models/addDossierPageDto';
import { APIService } from '../shared/services/api.service'

@Component({
  templateUrl: './add-dossier-page.component.html',
  styleUrls: ['./add-dossier-page.component.scss']
})
export class AddDossierPageComponent implements OnInit {

  @Input() public dossierForm: FormGroup = new FormGroup({});

  public submitted: boolean = false;
  public isAnonymous: boolean = false;

  constructor(private fb: FormBuilder,
    private apiService: APIService,
    private route: ActivatedRoute,
    private router: Router ) {
  }


  ngOnInit(): void {
    this.isAnonymous = this.route.snapshot.parent?.url.filter(v => v.path == 'anonymous').length == 1;
    console.log(this.isAnonymous);
    this.createForm();
  }

  private createForm() {
    this.dossierForm = this.fb.group({
      lastName: this.fb.control('', { validators: [Validators.required] }),
      firstName: this.fb.control('', { validators: [Validators.required] }),
      thirdName: this.fb.control('', { validators: [Validators.required] }),
      imageInput: this.fb.control(''),
      position: this.fb.control(''),
      placeOfWork: this.fb.control(''),
      region: this.fb.control('', { validators: [Validators.required] }),
      district: this.fb.control('', { validators: [Validators.required] }),
      localCommunity: this.fb.control(''),
      fileText: this.fb.control('', { validators: [Validators.required] }), //can be multiple attachtments
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
    return this.isAnonymous ? true: this.dossierForm.get('agreeForData')?.value == true && this.dossierForm.get('agreeForContract')?.value == true;
  }

  public submit() {

    this.submitted = true;

    if (this.dossierForm.valid) {

      let dto = this.dossierForm.value as AddDossierPageDto;

      console.log(dto);

      this.apiService.addDossier(dto).subscribe(res => {
        console.log(res);
        this.router.navigate(['/add-dossier/complete']);
      });
     
    }

  }

}

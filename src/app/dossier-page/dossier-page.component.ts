import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddDossierPageDto } from '../models/addDossierPageDto';
import { APIService } from '../shared/services/api.service'

@Component({
  selector: 'app-dossier-page',
  templateUrl: './dossier-page.component.html',
  styleUrls: ['./dossier-page.component.scss']
})
export class DossierPageComponent implements OnInit {

  @Input() public dossierForm: FormGroup = new FormGroup({});

  public submitted: boolean = false;

  constructor(private fb: FormBuilder,
    private apiService: APIService) {
  }


  ngOnInit(): void {
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
      fileText: this.fb.control('', { validators: [Validators.required] }),
      contactInfo: this.fb.control(''),
      phone: this.fb.control(''),
      email: this.fb.control(''),
      text: this.fb.control('', { validators: [Validators.required] }),
      agreeForData: this.fb.control('', { validators: [Validators.required] }),
      agreeForContract: this.fb.control('', { validators: [Validators.required] }),
    });

    this.dossierForm.get('agreeForData')?.setValue(false);
    this.dossierForm.get('agreeForContract')?.setValue(false);


  }

  canSubmit(): boolean {
    return this.dossierForm.get('agreeForData')?.value == true && this.dossierForm.get('agreeForContract')?.value == true;
  }

  public submit() {

    this.submitted = true;

    if (this.dossierForm.valid) {

      let dto = this.dossierForm.value as AddDossierPageDto;

      console.log(dto);

      this.apiService.get().subscribe(res => {
        console.log(res);
      });
    }

  }

}

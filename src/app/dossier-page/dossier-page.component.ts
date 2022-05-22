import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AddDossierPageDto } from '../models/addDossierPageDto';

@Component({
  selector: 'app-dossier-page',
  templateUrl: './dossier-page.component.html',
  styleUrls: ['./dossier-page.component.scss']
})
export class DossierPageComponent implements OnInit {

  @Input() public dossierForm: FormGroup = new FormGroup({});

  public list: any[];

  constructor(private fb: FormBuilder) {
    this.list = []
   }


  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.dossierForm = this.fb.group({
      lastName: this.fb.control('', { validators: [Validators.required] }),
      firstName: this.fb.control('', { validators: [Validators.required] }),
      thirdName: this.fb.control('',  { validators: [Validators.required] }),
      imageInput: this.fb.control(''),
      position: this.fb.control(''),
      placeOfWork: this.fb.control(''),
      region: this.fb.control('',  { validators: [Validators.required] }),
      district: this.fb.control('', { validators: [Validators.required] }),
      localCommunity: this.fb.control(''),
      fileText: this.fb.control('', { validators: [Validators.required] }),
      contactInfo: this.fb.control(''),
      phone: this.fb.control(''),
      email: this.fb.control(''),
      text: this.fb.control('',  { validators: [Validators.required] }),
    })
  }

  public submit() {  
    if(this.dossierForm.valid)
    {
  
    let dto = this.dossierForm.value as AddDossierPageDto;

    console.log(dto)
    }
    
  }

}
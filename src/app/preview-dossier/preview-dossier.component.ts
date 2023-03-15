import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddDossierPageDto } from '../models/addDossierPageDto';

@Component({
  selector: 'app-preview-dossier',
  templateUrl: './preview-dossier.component.html',
  styleUrls: ['./preview-dossier.component.scss']
})
export class PreviewDossierComponent implements OnInit {
  @Input() public dossierForm: FormGroup = new FormGroup({});

  public dto: AddDossierPageDto;
  constructor() {
    console.log(this.dossierForm);
    console.log('test2');
    this.dto = <AddDossierPageDto>this.dossierForm.value;
 
   }

  ngOnInit(): void {
    console.log('test');  
    console.log(this.dossierForm);
    
  }


}
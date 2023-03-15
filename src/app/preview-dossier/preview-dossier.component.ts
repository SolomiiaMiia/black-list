import { Component, OnInit } from '@angular/core';
import { AddDossierPageDto } from '../models/addDossierPageDto';

@Component({
  selector: 'app-preview-dossier',
  templateUrl: './preview-dossier.component.html',
  styleUrls: ['./preview-dossier.component.scss']
})
export class PreviewDossierComponent implements OnInit {
  

  public dto!: AddDossierPageDto;


  ngOnInit(): void {
   
  }



}

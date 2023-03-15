import { Component } from '@angular/core';
import { AddDossierPageDto } from '../models/addDossierPageDto';

@Component({
  selector: 'app-preview-dossier',
  templateUrl: './preview-dossier.component.html',
  styleUrls: ['./preview-dossier.component.scss']
})
export class PreviewDossierComponent {
  

  public dto!: AddDossierPageDto;
  public attachtments!: string[];
  public authorPhoto?: string;
  public relatedDossiers!: string[];





}

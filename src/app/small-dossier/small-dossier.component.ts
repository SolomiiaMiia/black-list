import { Component, Input, OnInit } from '@angular/core';
import { DossierSmallDto } from '../models/dossierSmallDto';

@Component({
  selector: 'app-small-dossier',
  templateUrl: './small-dossier.component.html',
  styleUrls: ['./small-dossier.component.scss']
})
export class SmallDossierComponent implements OnInit {


  @Input('dossier') dossier: DossierSmallDto = new DossierSmallDto;

  constructor() {

  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

}

import { Component, Input, OnInit } from '@angular/core';
import { DossierSmallDto } from '../models/dossierSmallDto';
import { EnumHelper } from '../models/enums';

@Component({
  selector: 'app-small-dossier',
  templateUrl: './small-dossier.component.html',
  styleUrls: ['./small-dossier.component.scss']
})
export class SmallDossierComponent implements OnInit {

  @Input('isAdmin') isAdmin: boolean = false;
  @Input('dossier') dossier: DossierSmallDto = new DossierSmallDto;
  public enumHelper: EnumHelper = new EnumHelper();

  constructor() {

  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

}

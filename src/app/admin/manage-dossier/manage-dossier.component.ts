import { Component, OnInit } from '@angular/core';
import { DossierType } from '../../models/dossierTypes';


@Component({
  selector: 'app-manage-dossier',
  templateUrl: './manage-dossier.component.html',
  styleUrls: ['./manage-dossier.component.scss', '../../search/search.component.scss']
})
export class ManageDossierComponent implements OnInit {

  DossierTypes = DossierType;
  public searchString: string = '';
  constructor() { }

  ngOnInit(): void {
    console.log('init');
  }

 

}

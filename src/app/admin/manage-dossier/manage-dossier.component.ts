import { Component, OnInit, ViewChild } from '@angular/core';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { DossierType } from '../../models/dossierTypes';
import { SearchComponent } from '../../search/search.component';


@Component({
  selector: 'app-manage-dossier',
  templateUrl: './manage-dossier.component.html',
  styleUrls: ['./manage-dossier.component.scss', '../../search/search.component.scss']
})
export class ManageDossierComponent implements OnInit {

  DossierTypes = DossierType;
  public searchString: string = '';
  @ViewChild('tabNew') tabNew!: SearchComponent;
  @ViewChild('tabPublished') tabPublished!: SearchComponent;
  @ViewChild('tabDeclined') tabDeclined!: SearchComponent;
  constructor() { }

  ngOnInit(): void {
    console.log('init');
  }

  public activeTab: string = 'tab1';

  changeTab($event: TabDirective) {
    this.activeTab = $event.id!;
  }

  search(): void {
    switch (this.activeTab) {
      case 'tab1':
        this.tabNew.search();
        break;
      case 'tab2':
        this.tabPublished.search();
        break;
      case 'tab3':
        this.tabDeclined.search();
        break; 
    }
  }

}

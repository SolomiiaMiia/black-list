import { Component, HostBinding, ViewChild } from '@angular/core';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { DossierType } from '../../models/enums';
import { SearchComponent } from '../../search/search.component';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { routingAnimation } from 'src/app/shared/animations/routing-animation';


@Component({
  selector: 'app-manage-dossier',
  templateUrl: './manage-dossier.component.html',
  styleUrls: ['./manage-dossier.component.scss', '../../search/search.component.scss'],
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})
export class ManageDossierComponent {

  DossierTypes = DossierType;
  public searchString: string = '';
  @ViewChild('tabNew') tabNew!: SearchComponent;
  @ViewChild('tabPublished') tabPublished!: SearchComponent;
  @ViewChild('tabDeclined') tabDeclined!: SearchComponent;
  constructor(private location: Location, private route: ActivatedRoute) {
    this.activeTab = this.route.snapshot.queryParams['activeTab'] ?? 'New';
    this.searchString = this.route.snapshot.queryParams['searchString'] ?? '';
  
  }



  public activeTab: string;

  changeTab($event: TabDirective) {
    this.activeTab = $event.id!;
    this.location.replaceState(`/admin/manage?activeTab=${this.activeTab}&searchString=${this.searchString}`);
  }


  search(): void {
    this.location.replaceState(`/admin/manage?activeTab=${this.activeTab}&searchString=${this.searchString}`);
    switch (this.activeTab) {
      case 'New':
        this.tabNew.search();
        break;
      case 'Published':
        this.tabPublished.search();
        break;
      case 'Declined':
        this.tabDeclined.search();
        break; 
    }
  }

}

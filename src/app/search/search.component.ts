import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DossierSmallDto } from '../models/dossierSmallDto';
import { DossierType } from '../models/enums';
import { APIService } from '../shared/services/api.service'
import { Location } from '@angular/common';
import { routingAnimation } from '../shared/animations/routing-animation';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})
export class SearchComponent implements OnInit {

  @Input('isAdmin') isAdmin: boolean = false;
  @Input('dossierType') dossierType: DossierType = DossierType.Published;
  @Input('searchText') searchText: string = '';
  @Output() searchEvent = new EventEmitter<string>();
  
  public searchResults : DossierSmallDto[] = [] 

  constructor(private apiService: APIService,
    private location: Location,
    private route: ActivatedRoute) {
    this.searchText = this.route.snapshot.queryParams['searchString'] ?? '';
  }


  ngOnInit(): void {
    this.search();
  }

  internalSearch(searchText: string): void {
    this.searchText = searchText;
    if (!this.isAdmin) {
      this.search();
    }
    else {
      this.searchEvent.emit(searchText);
    }
  }

  search(): void{
    if (!this.isAdmin) {
      this.location.replaceState(`/search?searchString=${this.searchText}`);
    }

    this.apiService.search(this.searchText, this.dossierType).subscribe(results => {
      this.searchResults = results;
    });

  }

}

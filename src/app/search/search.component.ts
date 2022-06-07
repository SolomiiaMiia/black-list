import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DossierSmallDto } from '../models/dossierSmallDto';
import { DossierType } from '../models/enums';
import { APIService } from '../shared/services/api.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input('isAdmin') isAdmin: boolean = false;
  @Input('dossierType') dossierType: DossierType = DossierType.Published;
  @Input('searchText') searchText: string = '';
  
  public searchResults : DossierSmallDto[] = [] 

  constructor(private router: Router,
    private apiService: APIService) {
    if (!this.isAdmin) {

      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state as {
        searchText: string
      };

      this.searchText = state?.searchText;
    }
  }


  ngOnInit(): void {
    this.search();
  }

  ngOnDestroy(): void {
    
  }

  search(): void{
    this.apiService.search(this.searchText, this.dossierType).subscribe(results => {
      this.searchResults = results;
    });

  }

}

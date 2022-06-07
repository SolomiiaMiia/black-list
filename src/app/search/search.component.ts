import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DossierSmallDto } from '../models/dossierSmallDto';
import { DossierStatus, DossierType } from '../models/enums';
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

  constructor(private route: ActivatedRoute,
    private apiService: APIService) {
    
  }


  ngOnInit(): void {
    this.search();
  }

  ngOnDestroy(): void {
    
  }

  search(): void{
    //if (!this.isAdmin) this.searchText = this.route.snapshot.queryParams['text'];

    this.apiService.search(this.searchText, this.dossierType).subscribe(results => {
      this.searchResults = results;
    });

  }

}

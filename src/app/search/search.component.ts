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
  
  public searchResults : DossierSmallDto[] = [
    {
      id : 1,
      img: 'assets/images/1.png',
      fullName: 'ПІБ 1',
      position: 'Посада',
      placeOfWork: 'Місце роботи',
      address: `New York, NY 10013
b/ t Division St & St James Pl
Chinatown, Civic Center`,
      date: new Date,
      status: DossierStatus.New,
      type: DossierType.DisproveNew,
    },
    {
      id: 2,
      img: 'assets/images/1.png',
      fullName: 'ПІБ 2',
      position: 'Посада',
      placeOfWork: 'Місце роботи',
      address: `New York, NY 10013
b/ t Division St & St James Pl
Chinatown, Civic Center`,
      date: new Date,
      status: DossierStatus.New,
      type: DossierType.Published,
    },
    {
      id: 3,
      img: 'assets/images/1.png',
      fullName: 'ПІБ 3',
      position: 'Посада',
      placeOfWork: 'Місце роботи',
      address: `New York, NY 10013
b/ t Division St & St James Pl
Chinatown, Civic Center`,
      date: new Date,
      status: DossierStatus.Disproved,
      type: DossierType.DisprovePublished,
    },
    {
      id: 4,
      img: 'assets/images/1.png',
      fullName: 'ПІБ 4',
      position: 'Посада',
      placeOfWork: 'Місце роботи',
      address: `New York, NY 10013
b/ t Division St & St James Pl
Chinatown, Civic Center`,
      date: new Date,
      status: DossierStatus.New,
      type: DossierType.New,
    },
    {
      id: 5,
      img: 'assets/images/1.png',
      fullName: 'ПІБ 4',
      position: 'Посада',
      placeOfWork: 'Місце роботи',
      address: `New York, NY 10013
b/ t Division St & St James Pl
Chinatown, Civic Center`,
      date: new Date,
      status: DossierStatus.New,
      type: DossierType.Declined,
    }
  ] 

  constructor(private route: ActivatedRoute,
    private apiService: APIService) {
    
  }


  ngOnInit(): void {
    this.search();
  }

  ngOnDestroy(): void {
    
  }

  search(): void{
    if (!this.isAdmin) this.searchText = this.route.snapshot.queryParams['text'];

    this.apiService.search(this.searchText, this.dossierType).subscribe(results => {
      this.searchResults = results;
    },
      err => {

      }
    );

  }

}

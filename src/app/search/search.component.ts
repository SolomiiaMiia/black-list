import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DossierSmallDto } from '../models/dossierSmallDto';
import { APIService } from '../shared/services/api.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  public searchText: string = '';
  public sub: Subscription;
  public searchResults : DossierSmallDto[] = [
    {
      img: 'assets/images/1.png',
      fullName: 'ПІБ 1',
      position: 'Посада',
      placeOfWork: 'Місце роботи',
      text: 'Текст, що викриває особу, підозрювану у корупції',
      date: new Date,
      status: 'Не спростовано',
    },
    {
      img: 'assets/images/1.png',
      fullName: 'ПІБ 2',
      position: 'Посада',
      placeOfWork: 'Місце роботи',
      text: 'Текст, що викриває особу, підозрювану у корупції',
      date: new Date,
      status: 'Не спростовано',
    },
    {
      img: 'assets/images/1.png',
      fullName: 'ПІБ 3',
      position: 'Посада',
      placeOfWork: 'Місце роботи',
      text: 'Текст, що викриває особу, підозрювану у корупції',
      date: new Date,
      status: 'Не спростовано',
    },
    {
      img: 'assets/images/1.png',
      fullName: 'ПІБ 4',
      position: 'Посада',
      placeOfWork: 'Місце роботи',
      text: 'Текст, що викриває особу, підозрювану у корупції',
      date: new Date,
      status: 'Не спростовано',
    }
  ] 

  constructor(private route: ActivatedRoute,
    private apiService: APIService  ) {
    this.sub = this.route.queryParams.subscribe(params => {
      this.searchText = params['text'];
    });
  }


  ngOnInit(): void {
   
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  search():void{

  }

}

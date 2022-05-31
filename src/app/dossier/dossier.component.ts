import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { DossierDto } from '../models/dossierDto';
import { APIService } from '../shared/services/api.service'


@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.scss']
})
export class DossierComponent implements OnInit {

  public searchText: string = '';
  public dossier: DossierDto = new DossierDto();


  constructor(private route: ActivatedRoute,
    private apiService: APIService) {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id') as any;
        this.dossier.id = id;
        return this.apiService.get(id);
      }),
    ).subscribe(res => {
      this.dossier = res;
    },
      err => {
        this.dossier = {
          id: 3,
          img: 'assets/images/1.png',
          fullName: 'ПІБ 3',
          position: 'Посада',
          placeOfWork: 'Місце роботи',
          address: `New York, NY 10013
b/ t Division St & St James Pl
Chinatown, Civic Center`,
          text:'Текст досьє',
          date: new Date,
          status: 'Не спростовано',
        } as DossierDto;
      }
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

}

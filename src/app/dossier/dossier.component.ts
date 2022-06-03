import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { DossierDto } from '../models/dossierDto';
import { DossierStatus, DossierType, EnumHelper } from '../models/enums';
import { APIService } from '../shared/services/api.service'


@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.scss']
})
export class DossierComponent implements OnInit {

  public searchText: string = '';
  public dossier: DossierDto = new DossierDto();
  public enumHelper: EnumHelper = new EnumHelper();
  DossierStatuses = DossierStatus;

  constructor(private route: ActivatedRoute,
    private apiService: APIService) {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
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
          lastName: 'Садовий',
          firstName: 'Андрій',
          thirdName: 'Іванович',
          position: 'Посада',
          placeOfWork: 'Місце роботи',
          address: `New York, NY 10013
b/ t Division St & St James Pl
Chinatown, Civic Center`,
          text:'Текст досьє',
          date: new Date,
          status: DossierStatus.Disproved,
          type: DossierType.New,
          isAnonymous: false,
          author: 'Автор',
          phone: '+380982774950',
          email: 'letos009@gmail.com',
          photo: { name: "1.png", url: "assets/images/1.png" },
          dossierFiles: [{ name: "sample.pdf", url: "assets/files/sample.pdf" }, { name: "sample.pdf", url: "assets/files/sample.pdf" }],
          disproveDossier: {
            text: "Текст спростування", author: "Автор", email: 'letos009@gmail.com', phone: '+380982774950',
            dossierFiles: [{ name: "sample.pdf", url: "assets/files/sample.pdf" }, { name: "sample.pdf", url: "assets/files/sample.pdf" }]}
        } as DossierDto;
      }
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

}

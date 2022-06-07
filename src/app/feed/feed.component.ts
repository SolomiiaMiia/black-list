import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DossierDto } from '../models/dossierDto';
import { DossierStatus, DossierType } from '../models/enums';
import { APIService } from '../shared/services/api.service'


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public feedEnabled: boolean = true;

  constructor(private route: ActivatedRoute,
    private apiService: APIService) {
   

  }

  public searchResults: DossierDto[] = [
    {
      id: 3,
      lastName: 'Садовий',
      firstName: 'Андрій',
      thirdName: 'Іванович',
      position: 'Посада',
      placeOfWork: 'Місце роботи',
      address: `New York, NY 10013
b/ t Division St & St James Pl
Chinatown, Civic Center`,
      text: 'Текст досьє',
      date: new Date,
      status: DossierStatus.Disproved,
      type: DossierType.Published,
      isAnonymous: false,
      author: 'Автор',
      phone: '+380982774950',
      email: 'letos009@gmail.com',
      photo: { name: "1.png", url: "assets/images/1.png" },
      dossierFiles: [{ name: "sample.pdf", url: "assets/files/sample.pdf" }, { name: "sample.pdf", url: "assets/files/sample.pdf" }],
      disproveDossier: {
        date: new Date,
        text: "Текст спростування", author: "Автор", email: 'letos009@gmail.com', phone: '+380982774950',
        dossierFiles: [{ name: "sample.pdf", url: "assets/files/sample.pdf" }, { name: "sample.pdf", url: "assets/files/sample.pdf" }]
      }
    }
  ];

  private counter: number = 0;

  onScroll() {
    this.apiService.feed(10).subscribe(results => {
      if (results.length > 0) {
        this.searchResults = this.searchResults.concat(results);
      }
    },
      err => {
        //todo: remove
        this.counter++;
        if (this.counter < 2) {
          this.searchResults = this.searchResults.concat([this.searchResults[0]]);
        }
      }
    );
  }

  search(): void {
    

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

}

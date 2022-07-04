import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DossierDto } from '../models/dossierDto';
import { routingAnimation } from '../shared/animations/routing-animation';
import { APIService } from '../shared/services/api.service'


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})
export class FeedComponent implements OnInit {

  public feedEnabled: boolean = true;

  constructor(private route: ActivatedRoute,
    private apiService: APIService) {
  }

  public searchResults: DossierDto[] = [];

  private counter: number = 0;

  onScroll() {
    this.apiService.feed(this.counter).subscribe(results => {
      if (results.length > 0) {
        this.searchResults = this.searchResults.concat(results);
        this.counter++;
      }
    });
  }

  ngOnInit(): void {
    this.onScroll();
  }

}

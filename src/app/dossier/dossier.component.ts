import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIService } from '../shared/services/api.service'


@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.scss']
})
export class DossierComponent implements OnInit {

  public searchText: string = '';
  public sub: Subscription;


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

}

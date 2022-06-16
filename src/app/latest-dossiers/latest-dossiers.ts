import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LatestDossiersDto  } from '../models/latestDossiersDto';
import { APIService } from '../shared/services/api.service';

@Component({
  selector: 'app-latest-dossier',
  templateUrl: './latest-dossiers.html',
  styleUrls: ['./latest-dossiers.scss']
})
export class LatestDossiersComponent  {


public  latestDossiers$: Observable<LatestDossiersDto[]>;

  constructor(
    private apiService: APIService) {
      this.latestDossiers$ = this.apiService.getLatestDossiers();
     }
}



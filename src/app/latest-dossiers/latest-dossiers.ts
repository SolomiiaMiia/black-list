import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LatestDossiersDto  } from '../models/latestDossiersDto';
import { APIService } from '../shared/services/api.service';

@Component({
  selector: 'app-file-card',
  templateUrl: './latest-dossiers.html',
  styleUrls: ['./latest-dossiers.scss']
})
export class LatestDossiersComponent implements OnInit {


public  latestDossiers$: Observable<LatestDossiersDto[]>;

  constructor(
    private route: ActivatedRoute, 
    private apiService: APIService) {
      this.latestDossiers$ = this.apiService.getLatestDossiers();
     }


  ngOnInit(): void {
    
  }
}



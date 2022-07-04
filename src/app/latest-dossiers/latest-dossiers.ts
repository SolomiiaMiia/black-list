import { Component} from '@angular/core';
import { Observable } from 'rxjs';
import { LatestDossiersDto  } from '../models/latestDossiersDto';
import { routingAnimation } from '../shared/animations/routing-animation';
import { APIService } from '../shared/services/api.service';

@Component({
  selector: 'app-latest-dossier',
  templateUrl: './latest-dossiers.html',
  styleUrls: ['./latest-dossiers.scss'],
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})
export class LatestDossiersComponent  {


public  latestDossiers$: Observable<LatestDossiersDto[]>;

  constructor(
    private apiService: APIService) {
      this.latestDossiers$ = this.apiService.getLatestDossiers();
     }
}



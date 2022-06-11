import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
  @Input('feedEnabled') feedEnabled: boolean = false;
  @Input('dossier') dossier!: DossierDto;
  public enumHelper: EnumHelper = new EnumHelper();
  DossierStatuses = DossierStatus;
  DossierTypes = DossierType;

  constructor(private route: ActivatedRoute,
    private apiService: APIService) {
    
  }

  loadDossierByUrl() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.apiService.get(id);
      }),
    ).subscribe(res => {
      this.dossier = res;
    });
  }

  ngOnInit(): void {
    if (!this.feedEnabled) {
      this.loadDossierByUrl();
    }
  }



  ngOnDestroy(): void {

  }

}

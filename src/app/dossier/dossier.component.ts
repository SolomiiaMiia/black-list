import { Component, Input, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { DossierDto } from '../models/dossierDto';
import { DossierStatus, DossierType, EnumHelper } from '../models/enums';
import { routingAnimation } from '../shared/animations/routing-animation';
import { APIService } from '../shared/services/api.service';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.scss'],
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})




export class DossierComponent implements OnInit {

  public searchText: string = '';
  @Input('feedEnabled') feedEnabled: boolean = false;
  @Input('dossier') dossier!: DossierDto;
  public enumHelper: EnumHelper = new EnumHelper();
  DossierStatuses = DossierStatus;
  DossierTypes = DossierType;

  constructor(private route: ActivatedRoute,
    private apiService: APIService,
    @Inject(DOCUMENT) private document: Document) {

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

  shared() {
    if (navigator.share) {
      navigator.share({
        title: this.document.location.origin + '/dossier/' + this.dossier.id,
        url: '/dossier/' + this.dossier.id
      }).then(() => {
        console.log('thanks');
      }).catch(console.error);
    }

  }

}

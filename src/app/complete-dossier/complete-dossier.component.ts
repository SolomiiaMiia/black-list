import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routingAnimation } from '../shared/animations/routing-animation';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-complete-dossier',
  templateUrl: './complete-dossier.component.html',
  styleUrls: ['./complete-dossier.component.scss'],
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})
export class CompleteDossierComponent{

  public newDossierText: string='';
  public disproveDossierText: string = '';
  public isNew: boolean;
  public id: number;
  constructor(private adminService: AdminService,
    private router: Router  ) {

    const navigation = this.router.getCurrentNavigation()!;
    const state = navigation.extras.state as {
      isNew: boolean,
      id: number
    };

    this.isNew = state.isNew;
    this.id = state.id;

    this.adminService.loadSettings((response) => {
      this.newDossierText = response.newDossierText;
      this.disproveDossierText = response.disproveDossierText;});
  }

}

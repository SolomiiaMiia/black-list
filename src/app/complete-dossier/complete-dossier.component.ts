import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-complete-dossier',
  templateUrl: './complete-dossier.component.html',
  styleUrls: ['./complete-dossier.component.scss']
})
export class CompleteDossierComponent implements OnInit {

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

  ngOnInit(): void {
   
  }

}

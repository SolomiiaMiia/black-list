import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-complete-dossier',
  templateUrl: './complete-dossier.component.html',
  styleUrls: ['./complete-dossier.component.scss']
})
export class CompleteDossierComponent implements OnInit {

  public newDossierText: string='';
  public disproveDossierText: string = '';
  public isNew: boolean = true;
  constructor(private adminService: AdminService) {
    this.adminService.loadSettings((response) => {
      this.newDossierText = response.newDossierText;
      this.disproveDossierText = response.disproveDossierText;});
  }

  ngOnInit(): void {
   
  }

}

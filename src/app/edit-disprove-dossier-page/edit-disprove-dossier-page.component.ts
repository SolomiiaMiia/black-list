import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DossierDto } from '../models/dossierDto';
import { DossierStatus, DossierType } from '../models/enums';
import { APIService } from '../shared/services/api.service'
import { AdminService } from '../shared/services/admin.service';
import { NotifyService } from '../shared/services/notify.service';

@Component({
  templateUrl: './edit-disprove-dossier-page.component.html',
  styleUrls: ['./edit-disprove-dossier-page.component.scss']
})
export class EditDisproveDossierPageComponent implements OnInit {

  public DossierTypes = DossierType;
  public DossierStatuses = DossierStatus;

  public submitted: boolean = false;
  public id: number = 0;
  public dossier: DossierDto = new DossierDto();
  public isSuperAdmin: boolean;

  constructor(private apiService: APIService,
    private route: ActivatedRoute,
    private router: Router,
    adminService: AdminService,
    private notifyService: NotifyService) {
    this.isSuperAdmin = adminService.isSuperAdmin();
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.parent?.url.filter(v => !isNaN(Number(v.path)))[0].path);
    this.loadDossier();
  }

  private loadDossier() {
    this.apiService.get(this.id).subscribe(res => {
      this.dossier = res;
    });
  }


  public submit(action: 'publish' | 'deny') {
    let confirmText = '';
    let successText = '';
    switch (action) {
      case 'publish':
        confirmText = `Опублікувати спростування досьє ${this.id}?`;
        successText = `Спростування досьє ${this.id} опубліковано`;
        break;
      case 'deny':
        confirmText = `Відхилити спростування досьє ${this.id}?`;
        successText = `Спростування досьє ${this.id} відхилено`;
        break;
    }

    if (confirm(confirmText)) {
      this.apiService.publishDisproveDossier(this.id, action).subscribe(res => {
        this.router.navigate(['/admin/manage']);
        this.notifyService.info(successText);
      });
    }
  }

  public delete() {
    if (confirm(`Видалити спростування досьє ${this.id} назавжди?`)) {
      this.apiService.deleteDisproveDossier(this.id).subscribe(res => {
        this.router.navigate(['/admin/manage']);
        this.notifyService.info(`Спростування досьє ${this.id} видалено`)
      });
    }
  }
}

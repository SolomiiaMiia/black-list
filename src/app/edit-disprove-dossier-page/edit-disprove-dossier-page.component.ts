import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DossierDto } from '../models/dossierDto';
import { DossierType } from '../models/enums';
import { APIService } from '../shared/services/api.service'
import { AdminService } from '../shared/services/admin.service';

@Component({
  templateUrl: './edit-disprove-dossier-page.component.html',
  styleUrls: ['./edit-disprove-dossier-page.component.scss']
})
export class EditDisproveDossierPageComponent implements OnInit {

  public DossierTypes = DossierType;

  public submitted: boolean = false;
  public id: number = 0;
  public dossier: DossierDto = new DossierDto();
  public isSuperAdmin: boolean;

  constructor(private apiService: APIService,
    private route: ActivatedRoute,
    private router: Router,
    adminService: AdminService) {
    this.isSuperAdmin = adminService.isSuperAdmin();
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.parent?.url.filter(v => !isNaN(Number(v.path)))[0].path);
    this.loadDossier();
  }

  private loadDossier() {
    this.apiService.get(this.id).subscribe(res => {
      this.dossier = res;
    },
      err => {
        this.dossier = {
          id: 3,
          type: DossierType.DisprovePublished,
          disproveDossier: {
            text: "Текст спростування", author: "Автор", email: 'letos009@gmail.com', phone: '+380982774950',
            dossierFiles: [{ name: "sample.pdf", url: "assets/files/sample.pdf" }, { name: "sample.pdf", url: "assets/files/sample.pdf" }]
          }
        } as DossierDto;
      }
    );
  }


  public submit(action: 'publish' | 'deny') {
    this.apiService.publishDisproveDossier(this.id, action).subscribe(res => {

        this.router.navigate(['/admin/manage']);
      }, err => {
        this.router.navigate(['/admin/manage']);
      });

  }

  public delete() {

    if (confirm("Видалити спростування досьє назавжди?")) {

      this.apiService.deleteDisproveDossier(this.id).subscribe(res => {

        this.router.navigate(['/admin/manage']);
      }, err => {
        this.router.navigate(['/admin/manage']);
      });

    }

  }

}

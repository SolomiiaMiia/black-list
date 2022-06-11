import { Component, Input, OnInit } from '@angular/core';
import { DossierSmallDto } from '../models/dossierSmallDto';
import { DossierStatus, DossierType, EnumHelper } from '../models/enums';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-small-dossier',
  templateUrl: './small-dossier.component.html',
  styleUrls: ['./small-dossier.component.scss']
})
export class SmallDossierComponent implements OnInit {

  @Input('isAdmin') isAdmin: boolean = false;
  @Input('dossier') dossier: DossierSmallDto = new DossierSmallDto;
  public enumHelper: EnumHelper = new EnumHelper();
  DossierStatuses = DossierStatus;
  DossierTypes = DossierType;

  constructor(public adminService: AdminService) {

  }


  ngOnInit(): void { 

  }

  ngOnDestroy(): void {

  }

}

import { Component, Input } from '@angular/core';
import { DossierSmallDto } from '../models/dossierSmallDto';
import { DossierStatus, DossierType, EnumHelper } from '../models/enums';
import { routingAnimation } from '../shared/animations/routing-animation';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-small-dossier',
  templateUrl: './small-dossier.component.html',
  styleUrls: ['./small-dossier.component.scss'],
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})
export class SmallDossierComponent {

  @Input('isAdmin') isAdmin: boolean = false;
  @Input('dossier') dossier: DossierSmallDto = new DossierSmallDto;
  public enumHelper: EnumHelper = new EnumHelper();
  DossierStatuses = DossierStatus;
  DossierTypes = DossierType;

  constructor(public adminService: AdminService) {

  }

}

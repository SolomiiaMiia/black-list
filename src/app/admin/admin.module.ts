import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from "@angular/router";

import { AdminComponent } from './admin.component';
import { ManageDossierModule } from './manage-dossier/manage-dossier.module';




@NgModule({
  declarations: [AdminComponent],
  imports: [
    
    CommonModule,
    RouterModule.forChild([{ path: '', component: AdminComponent}]),  
    ManageDossierModule  
  ],
  
  
})
export class AdminModule { }

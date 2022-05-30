import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ManageDossierComponent } from './manage-dossier.component';



@NgModule({
  declarations: [ManageDossierComponent],
  imports: [
    CommonModule,
    RouterModule,

  ]
})
export class ManageDossierModule { }
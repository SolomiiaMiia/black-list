import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SmallDossierComponent } from './small-dossier.component';


@NgModule({
  declarations: [
    SmallDossierComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
 
  ],
  exports:
  [
      SmallDossierComponent
  ]
})
export class SmallDossierModule { }

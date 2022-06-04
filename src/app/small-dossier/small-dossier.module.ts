import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SmallDossierComponent } from './small-dossier.component';
import { CompleteDossierModule } from '../complete-dossier/complete-dossier.module';

@NgModule({
  declarations: [
    SmallDossierComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CompleteDossierModule
  ],
  exports:
  [
      SmallDossierComponent
  ]
})
export class SmallDossierModule { }

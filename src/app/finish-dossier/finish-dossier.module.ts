import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FinishDossierComponent } from './finish-dossier.component';



@NgModule({
  declarations: [FinishDossierComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: FinishDossierComponent }]),
  ],
  exports: [FinishDossierComponent]
})
export class FinishDossierModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { CompleteDossierComponent } from './complete-dossier.component';



@NgModule({
  declarations: [ CompleteDossierComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CompleteDossierComponent}]),
  ]
})
export class CompleteDossierModule { }
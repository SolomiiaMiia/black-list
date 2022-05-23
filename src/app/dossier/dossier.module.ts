import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from "@angular/router";
import { DossierComponent } from './dossier.component';

@NgModule({
  declarations: [DossierComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: DossierComponent}]),
  ]
})
export class DossierModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule} from '@angular/forms';

import { DossierPageComponent } from './dossier-page.component';




@NgModule({
  declarations: [
    DossierPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: DossierPageComponent}]),
    ReactiveFormsModule
  
  ],
  exports:
  [

  ]
})
export class DossierPageModule { }

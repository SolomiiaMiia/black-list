import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule} from '@angular/forms';

import { DisproveDossierPageComponent } from './disprove-dossier-page.component';
import { FroalaEditorModule } from 'angular-froala-wysiwyg';




@NgModule({
  declarations: [
    DisproveDossierPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DisproveDossierPageComponent}]),
    ReactiveFormsModule,
    FroalaEditorModule.forRoot()
  
  ],
  exports:
  [

  ]
})
export class DisproveDossierPageModule { }

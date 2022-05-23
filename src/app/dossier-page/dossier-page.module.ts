import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule} from '@angular/forms';

import { DossierPageComponent } from './dossier-page.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';




@NgModule({
  declarations: [
    DossierPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: DossierPageComponent}]),
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  
  ],
  exports:
  [

  ]
})
export class DossierPageModule { }

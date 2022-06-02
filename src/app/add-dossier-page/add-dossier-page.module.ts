import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule} from '@angular/forms';

import { AddDossierPageComponent } from './add-dossier-page.component';
import { FroalaEditorModule } from 'angular-froala-wysiwyg';




@NgModule({
  declarations: [
    AddDossierPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AddDossierPageComponent}]),
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
  
  ],
  exports:
  [

  ]
})
export class AddDossierPageModule { }

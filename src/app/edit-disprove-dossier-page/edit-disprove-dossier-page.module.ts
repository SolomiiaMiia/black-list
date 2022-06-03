import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule} from '@angular/forms';

import { EditDisproveDossierPageComponent } from './edit-disprove-dossier-page.component';
import {  FroalaViewModule } from 'angular-froala-wysiwyg';
import { FilePreviewModule } from '../file-preview/file-preview.module';




@NgModule({
  declarations: [
    EditDisproveDossierPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: EditDisproveDossierPageComponent}]),
    ReactiveFormsModule,
    FroalaViewModule.forRoot(),
    FilePreviewModule
  
  ],
  exports:
  [

  ]
})
export class EditDisproveDossierPageModule { }

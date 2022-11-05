import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { FroalaViewModule } from 'angular-froala-wysiwyg';
import { TagInputModule } from 'ngx-chips';
import { FilePreviewModule } from '../file-preview/file-preview.module';
import { EditDossierPageComponent } from './edit-dossier-page.component';

@NgModule({
  declarations: [
    EditDossierPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: EditDossierPageComponent }]),
    ReactiveFormsModule,
    FroalaViewModule.forRoot(),
    FilePreviewModule,
    TagInputModule
  ],
  exports:
    [

    ]
})
export class EditDossierPageModule { }

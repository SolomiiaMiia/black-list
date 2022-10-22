import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';

import { EditDossierPageComponent } from './edit-dossier-page.component';
import { FroalaViewModule } from 'angular-froala-wysiwyg';
import { FilePreviewModule } from '../file-preview/file-preview.module';

import { TagInputModule } from 'ngx-chips';
import { Settings } from '../shared/settings/settings';

TagInputModule.withDefaults(Settings.TagsSettings());


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

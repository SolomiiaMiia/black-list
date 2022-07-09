import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule} from '@angular/forms';

import { SettingsPageComponent } from './settings-page.component';
import { FroalaEditorModule } from 'angular-froala-wysiwyg';
import { FilePreviewModule } from '../../file-preview/file-preview.module';



@NgModule({
  declarations: [
    SettingsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SettingsPageComponent}]),
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FilePreviewModule
  ],
  exports:
  [
      SettingsPageComponent
  ]
})
export class SettingsPageModule { }

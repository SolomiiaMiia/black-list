import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule} from '@angular/forms';

import { SettingsPageComponent } from './settings-page.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';




@NgModule({
  declarations: [
    SettingsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SettingsPageComponent}]),
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  exports:
  [
      SettingsPageComponent
  ]
})
export class SettingsPageModule { }

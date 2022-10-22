import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from "@angular/router";
import { DossierComponent } from './dossier.component';
import { FroalaViewModule } from 'angular-froala-wysiwyg';
import { FilePreviewModule } from '../file-preview/file-preview.module';
import { TagInputModule } from 'ngx-chips';
import { Settings } from '../shared/settings/settings';
import { FormsModule } from '@angular/forms';

TagInputModule.withDefaults(Settings.TagsSettings());



@NgModule({
  declarations: [DossierComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DossierComponent }]),
    FroalaViewModule.forRoot(),
    FilePreviewModule,
    TagInputModule,
    FormsModule
  ],
  exports: [DossierComponent]
})
export class DossierModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from "@angular/router";
import { DossierComponent } from './dossier.component';
import { FroalaViewModule } from 'angular-froala-wysiwyg';
import { FilePreviewModule } from '../file-preview/file-preview.module';

@NgModule({
  declarations: [DossierComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DossierComponent }]),
    FroalaViewModule.forRoot(),
    FilePreviewModule
  ],
  exports: [DossierComponent]
})
export class DossierModule { }

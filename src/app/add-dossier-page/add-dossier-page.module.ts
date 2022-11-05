import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { FroalaEditorModule } from 'angular-froala-wysiwyg';
import { TagInputModule } from 'ngx-chips';
import { AddDossierPageComponent } from './add-dossier-page.component';

@NgModule({
  declarations: [
    AddDossierPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AddDossierPageComponent}]),
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    TagInputModule
  ],
  exports:
  [

  ]
})
export class AddDossierPageModule { }

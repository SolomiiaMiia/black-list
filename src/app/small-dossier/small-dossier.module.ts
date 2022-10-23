import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { SmallDossierComponent } from './small-dossier.component';
import { TagInputModule } from 'ngx-chips';
import { Settings } from '../shared/settings/settings';
import { FormsModule } from '@angular/forms';

TagInputModule.withDefaults(Settings.TagsSettings());


@NgModule({
  declarations: [
    SmallDossierComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TagInputModule,
    FormsModule
  ],
  exports:
  [
      SmallDossierComponent
  ]
})
export class SmallDossierModule { }

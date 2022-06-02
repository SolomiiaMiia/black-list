import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ManageDossierComponent } from './manage-dossier.component';
import { SearchModule } from '../../search/search.module';
import { FormsModule } from '@angular/forms';
import { SettingsPageModule } from '../settings-page/settings-page.module';




@NgModule({
  declarations: [ManageDossierComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ManageDossierComponent}]),
    TabsModule.forRoot(),
    SearchModule,
    FormsModule,
    SettingsPageModule
  ],
})
export class ManageDossierModule { }

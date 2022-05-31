import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ManageDossierComponent } from './manage-dossier.component';
import { SearchModule } from '../../search/search.module';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [ManageDossierComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ManageDossierComponent}]),
    TabsModule.forRoot(),
    SearchModule,
    FormsModule,
  ],
})
export class ManageDossierModule { }

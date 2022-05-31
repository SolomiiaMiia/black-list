import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { SearchComponent } from './search.component';
import { SmallDossierModule } from '../small-dossier/small-dossier.module';




@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SearchComponent}]),
    ReactiveFormsModule,
    SmallDossierModule,
    FormsModule
  
  ],
  exports:
  [
      SearchComponent
  ]
})
export class SearchModule { }

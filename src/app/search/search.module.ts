import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule} from '@angular/forms';

import { SearchComponent } from './search.component';




@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SearchComponent}]),
    ReactiveFormsModule
  
  ],
  exports:
  [

  ]
})
export class SearchModule { }

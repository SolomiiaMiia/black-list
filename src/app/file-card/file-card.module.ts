import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { FileCardComponent } from './file-card.component';


@NgModule({
  declarations: [
    FileCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule 
  ],
  exports:[
    FileCardComponent
  ]
})
export class FileCardModule { }

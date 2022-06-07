import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { LatestDossiersComponent  } from './latest-dossiers';


@NgModule({
  declarations: [
    LatestDossiersComponent 
  ],
  imports: [
    CommonModule,
    RouterModule 
  ],
  exports:[
    LatestDossiersComponent 
  ]
})
export class LatestDossiersModule { }

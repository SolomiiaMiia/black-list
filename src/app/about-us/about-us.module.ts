import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { AboutUsComponent } from './about-us.component';


@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AboutUsComponent }]),
  ],
  exports:[]
})
export class AboutUsModule { }

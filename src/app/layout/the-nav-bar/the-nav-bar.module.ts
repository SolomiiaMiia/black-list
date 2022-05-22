import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { TheNavBarComponent } from './the-nav-bar.component';



@NgModule({
  declarations: [TheNavBarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[ TheNavBarComponent]
})
export class TheNavBarModule { }

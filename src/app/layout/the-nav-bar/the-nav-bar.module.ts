import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { TheNavBarComponent } from './the-nav-bar.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';



@NgModule({
  declarations: [TheNavBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    CollapseModule
  ],
  exports:[ TheNavBarComponent]
})
export class TheNavBarModule { }

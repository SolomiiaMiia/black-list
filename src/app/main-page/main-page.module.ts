import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';


import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { FileCardModule } from '../file-card/file-card.module';
import { TheNavBarModule } from '../layout/the-nav-bar/the-nav-bar.module';
import { FilePreviewModule } from '../file-preview/file-preview.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    MainPageRoutingModule,
    FileCardModule,
    TheNavBarModule,
    FormsModule,
    FilePreviewModule
  
  ],
})
export class MainPageModule { }

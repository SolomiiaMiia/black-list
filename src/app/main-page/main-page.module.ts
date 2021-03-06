import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';


import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { LatestDossiersModule } from '../latest-dossiers/latest-dossiers.module';
import { TheNavBarModule } from '../layout/the-nav-bar/the-nav-bar.module';
import { MyCarouselModule } from './carousel/carousel.module';


@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    MainPageRoutingModule,
    LatestDossiersModule,
    TheNavBarModule,
    FormsModule,
    MyCarouselModule
  ],
})
export class MainPageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";


import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { FileCardModule } from '../file-card/file-card.module';
import { DossierPageModule } from '../dossier-page/dossier-page.module';
import { TheNavBarModule } from '../layout/the-nav-bar/the-nav-bar.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    MainPageRoutingModule,
    FileCardModule,
    DossierPageModule,
    TheNavBarModule

  
  ],
})
export class MainPageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselComponent } from './carousel.component';
import { CarouselConfig } from 'ngx-bootstrap/carousel';


@NgModule({
  declarations: [
    CarouselComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule
  ],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, showIndicators: true, isAnimated: true, pauseOnFocus: false } }
  ],
  exports:
  [
      CarouselComponent
  ]
})
export class MyCarouselModule { }

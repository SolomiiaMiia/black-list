import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheFooterComponent } from './the-footer.component';



@NgModule({
  declarations: [TheFooterComponent],
  imports: [
    CommonModule
  ],
  exports:[TheFooterComponent]
})
export class TheFooterModule { }

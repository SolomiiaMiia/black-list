import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilePreviewComponent } from './file-preview.component';
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [FilePreviewComponent],
  imports: [
    CommonModule,
    RouterModule,

  ],
  exports:[FilePreviewComponent]
})
export class FilePreviewModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewDossierComponent } from './preview-dossier.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PreviewDossierComponent],
  imports: [
    CommonModule
  ],
  exports:[PreviewDossierComponent]
})
export class PreviewDossierModule { }
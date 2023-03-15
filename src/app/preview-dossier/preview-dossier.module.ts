import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FroalaViewModule } from 'angular-froala-wysiwyg';
import { PreviewDossierComponent } from './preview-dossier.component';



@NgModule({
  declarations: [PreviewDossierComponent],
  imports: [
    CommonModule,
    FroalaViewModule.forRoot(),
  ],
  exports:[PreviewDossierComponent]
})
export class PreviewDossierModule { }

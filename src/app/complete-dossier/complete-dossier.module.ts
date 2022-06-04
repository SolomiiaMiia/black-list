import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { CompleteDossierComponent } from './complete-dossier.component';
import { FroalaViewModule } from 'angular-froala-wysiwyg';



@NgModule({
  declarations: [ CompleteDossierComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CompleteDossierComponent }]),
    FroalaViewModule.forRoot()
  ],
  exports:[CompleteDossierComponent]
})
export class CompleteDossierModule { }

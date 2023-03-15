import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { FroalaEditorModule } from 'angular-froala-wysiwyg';
import { TagInputModule } from 'ngx-chips';
import { AddDossierPageComponent } from './add-dossier-page.component';
import { PreviewDossierModule } from "../preview-dossier/preview-dossier.module";

@NgModule({
    declarations: [
        AddDossierPageComponent
    ],
    exports: [],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: AddDossierPageComponent }]),
        ReactiveFormsModule,
        FroalaEditorModule.forRoot(),
        TagInputModule,
        PreviewDossierModule
    ]
})
export class AddDossierPageModule { }

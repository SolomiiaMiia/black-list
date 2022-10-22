import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from "@angular/router";
import { DossierModule } from '../dossier/dossier.module';
import { FeedComponent } from './feed.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: FeedComponent }]),
    DossierModule,
    InfiniteScrollModule,
  ]
})
export class FeedModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'dossier/:id',
    loadChildren: () => import('./dossier/dossier.module').then(m => m.DossierModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

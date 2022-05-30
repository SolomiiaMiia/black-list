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
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'admin/manage',
    loadChildren: () => import('./admin/manage-dossier/manage-dossier.module').then(m => m.ManageDossierModule),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

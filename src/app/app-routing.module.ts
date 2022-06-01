import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageDossierComponent } from './admin/manage-dossier/manage-dossier.component';

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
    path: 'admin/manage',
    component: ManageDossierComponent,
    loadChildren: () => import('./admin/manage-dossier/manage-dossier.module').then(m => m.ManageDossierModule),
  },
  {
    path: 'dossier/:id/disprove',
    loadChildren: () => import('./disprove-dossier-page/disprove-dossier-page.module').then(m => m.DisproveDossierPageModule)
  },
  {
    path: 'admin/dossier/:id/edit',
    loadChildren: () => import('./add-dossier-page/add-dossier-page.module').then(m => m.AddDossierPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

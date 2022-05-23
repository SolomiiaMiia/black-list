import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';

const routes: Routes = [
  {
    path: 'home',
    component: MainPageComponent,
  },
  {
    path: '',
    loadChildren: () => import('../file-card/file-card.module').then(m => m.FileCardModule),
  },
  {
    path: 'add-dossier',
<<<<<<< HEAD
    loadChildren: () => import('../dossier-page/dossier-page.module').then(m => m.DossierPageModule)
=======
    loadChildren: () => import('../add-dossier-page/add-dossier-page.module').then(m => m.AddDossierPageModule)
>>>>>>> 4f39eba258bd2cdd5efa8411ac1ff082a60aa13a
  },
  {
    path: 'search',
    loadChildren: () => import('../search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'dossier',
    loadChildren: () => import('../dossier/dossier.module').then(m => m.DossierModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }

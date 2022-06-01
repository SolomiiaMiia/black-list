import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: '',
    loadChildren: () => import('../file-card/file-card.module').then(m => m.FileCardModule),
  },
  {
    path: 'add-dossier',
    loadChildren: () => import('../add-dossier-page/add-dossier-page.module').then(m => m.AddDossierPageModule)
  },
  {
    path: 'add-dossier/anonymous',
    loadChildren: () => import('../add-dossier-page/add-dossier-page.module').then(m => m.AddDossierPageModule)
  },
  {
    path: 'add-dossier/complete',
    loadChildren: () => import('../complete-dossier/complete-dossier.module').then(m => m.CompleteDossierModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }

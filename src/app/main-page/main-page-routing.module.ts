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
        loadChildren: () => import('../dossier-page/dossier-page.module').then(m => m.DossierPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('../search/search.module').then(m => m.SearchModule)
  }
    
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }

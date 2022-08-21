import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageDossierComponent } from './admin/manage-dossier/manage-dossier.component';
import { FeedComponent } from './feed/feed.component';
import { FinishDossierComponent } from './finish-dossier/finish-dossier.component';
import { AdminGuard } from './shared/services/admin-guard';


const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule)
  },
  {
    path: 'admin/login',
    loadChildren: () => import('./admin/login-page/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'finish',
    component: FinishDossierComponent,
    loadChildren: () => import('./finish-dossier/finish-dossier.module').then(m => m.FinishDossierModule)
  },
  {
    path: 'feed',
    component: FeedComponent,
    loadChildren: () => import('./feed/feed.module').then(m => m.FeedModule)
  },
  {
    path: 'dossier/:id',
    loadChildren: () => import('./dossier/dossier.module').then(m => m.DossierModule)
  },
  {
    path: 'admin/manage',
    canActivate: [AdminGuard],
    component: ManageDossierComponent,
    loadChildren: () => import('./admin/manage-dossier/manage-dossier.module').then(m => m.ManageDossierModule),
  },
  {
    path: 'dossier/:id/disprove',
    loadChildren: () => import('./disprove-dossier-page/disprove-dossier-page.module').then(m => m.DisproveDossierPageModule)
  },
  {
    path: 'admin/dossier/:id/edit',
    canActivate: [AdminGuard],
    loadChildren: () => import('./edit-dossier-page/edit-dossier-page.module').then(m => m.EditDossierPageModule)
  },
  {
    path: 'admin/dossier/:id/disprove/edit',
    loadChildren: () => import('./edit-disprove-dossier-page/edit-disprove-dossier-page.module').then(m => m.EditDisproveDossierPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: '404',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
  },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

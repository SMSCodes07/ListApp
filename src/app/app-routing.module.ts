import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./core/authentication/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./core/authentication/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'user-tabs',
    loadChildren: () => import('./core/components/private/user-tabs/user-tabs.module').then( m => m.UserTabsPageModule)
  },
  {
    path: 'user-list',
    loadChildren: () => import('./core/components/private/user-list/user-list.module').then( m => m.UserListPageModule)
  },
  {
    path: 'list-details',
    loadChildren: () => import('./core/components/private/list-details/list-details.module').then( m => m.ListDetailsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./core/components/private/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'list-modal',
    loadChildren: () => import('./core/components/private/list-modal/list-modal.module').then( m => m.ListModalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

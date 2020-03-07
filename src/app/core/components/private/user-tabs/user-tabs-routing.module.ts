import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserTabsPage } from './user-tabs.page';

const routes: Routes = [
  {
    path: 'userTabs',
    component: UserTabsPage,
    children: [
      {
        path: 'userList',
        loadChildren: () => import('../user-list/user-list.module').then(m => m.UserListPageModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule),
      }
    ]
  },
  {
    path: '',
    redirectTo: 'userTabs/userList',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTabsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserTabsPageRoutingModule } from './user-tabs-routing.module';

import { UserTabsPage } from './user-tabs.page';
import { ListModalPageModule } from '../list-modal/list-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserTabsPageRoutingModule,
    ListModalPageModule
  ],
  declarations: [
    UserTabsPage,
  ]
})
export class UserTabsPageModule {}

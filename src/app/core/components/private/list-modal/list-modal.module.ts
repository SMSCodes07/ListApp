import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListModalPageRoutingModule } from './list-modal-routing.module';

import { ListModalPage } from './list-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListModalPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ListModalPage]
})
export class ListModalPageModule {}

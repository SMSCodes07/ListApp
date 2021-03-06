import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListDetailsPageRoutingModule } from './list-details-routing.module';

import { ListDetailsPage } from './list-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListDetailsPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ListDetailsPage]
})
export class ListDetailsPageModule {}

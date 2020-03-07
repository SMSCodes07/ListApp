import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListModalPage } from '../list-modal/list-modal.page';

@Component({
  selector: 'app-user-tabs',
  templateUrl: './user-tabs.page.html',
  styleUrls: ['./user-tabs.page.scss'],
})
export class UserTabsPage implements OnInit {

  constructor(private nativeModal: ModalController) { }

  ngOnInit() {
  }
  // Funcion para crear el modal
  async openModal () {
    const listModal = await this.nativeModal.create({
      component: ListModalPage,
      animated: true,
      swipeToClose: true,
      showBackdrop: false,
      cssClass: 'listModal'
    })
    return await listModal.present();
  }
  // Funcion para crear el modal
}

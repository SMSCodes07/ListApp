import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.page.html',
  styleUrls: ['./list-modal.page.scss'],
})
export class ListModalPage implements OnInit {
  // Variable para extraer la fecha
  listDate: String;
  // Variable para extraer la fecha
  // Variable para el formulario del modal
  modalForm: FormGroup;
  // Variable para el formulario del modal
  // Arreglo para la lista de elementos para comprar
  itemsList = [];
  // Arreglo para la lista de elementos para comprar
  // Validación para el boton de creacion de listas
  buttonValidation = true;
  // Validación para el boton de creacion de listas
  constructor(private nativeModal: ModalController, private formBuilder: FormBuilder, private nativeToast: ToastController,
              private userAuth: AngularFireAuth, private realtimeDatabase: AngularFireDatabase) { }

  ngOnInit() {
    // Extrayendo la fecha
    const newDate = new Date();
    this.listDate = (newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear());
    // Extrayendo la fecha
    // Inicializando formulario del modal
    this.modalForm = this.formBuilder.group({
      listTitle: ['', [Validators.required]],
      listItem: ['', [Validators.required, Validators.minLength(2)]],
      listItemNumber: ['', [Validators.required, Validators.min(1)]],
    });
    // Inicializando formulario del modal
  }
  // Funcion para agregar un nuevo itema a la lista
  addItem() {
    // Extrayendo datos del formulario
    const listItem = this.modalForm.value.listItem;
    const listItemNumber = this.modalForm.value.listItemNumber;
    // Extrayendo datos del formulario
    // Agregano articulos a la lista
    this.itemsList.push({
      itemName: listItem,
      itemNumber: listItemNumber,
    });
    // Agregano articulos a la lista
    // Limpiando los campos del formulario
    this.modalForm.get('listItem').reset();
    this.modalForm.get('listItemNumber').reset();
    // Limpiando los campos del formulario
    // Validando el boton de creacion de listas
    if (this.itemsList.length == 0) {
      this.buttonValidation = true;
    } else {
      this.buttonValidation = false;
    }
    // Validando el boton de creacion de listas
  }
  // Funcion para agregar un nuevo itema a la lista
  // Funcion para eliminar un elemento de la lista
  deleteItem(itemPosition) {
    this.itemsList.splice(itemPosition, 1);
  }
  // Funcion para eliminar un elemento de la lista
  // Funcion para agregar los datos a la base de datos
  async createList() {
    // Asignando formato a los datos de la lista
    const listData = Object.assign({}, this.itemsList);
    // Asignando formato a los datos de la lista
    // Extrayendo userID
    const userID = this.userAuth.auth.currentUser.uid;
    // Extrayendo userID
    // Codigo unico para las listas
    const listCode = Date.now();
    // Codigo unico para las listas
    // Extrayendo los datos de la fecha
    const newDate = new Date();
    const registerDate = (newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear());
    // Extrayendo los datos de la fecha
    // Creando registro en la base de datos
    await this.realtimeDatabase.database.ref('listAppPlatform/users/' + userID + '/userList/' + listCode + '/').set({
      listCreationDate: registerDate,
      listItems: listData
    })
    // Creando registro en la base de datos
    // Notificando la creacion de la nota
    .then(async () => {
      const successToast = await this.nativeToast.create({
        message: 'Lista guardada',
        position: 'bottom',
        color: 'butterColor',
        cssClass: 'customModal',
        animated: true,
        buttons: [
          {
            icon: 'checkmark',
            text: 'Aceptar',
            handler: () => {
              this.nativeModal.dismiss();
            }
          }
        ]
      });
      successToast.present();
    });
    // Notificando la creacion de la nota
  }
  // Funcion para agregar los datos a la base de datos
}

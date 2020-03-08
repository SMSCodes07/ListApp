import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListService } from 'src/app/core/services/list/list.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  // Variable para extraer los datos
  public dataExtractor1: any;  
  // Variable para extraer los datos
  // Objeto para almacenar los datos
  listData = {listCode: null, listCreationDate: null, listItems: {}, listTitle: null};
  // Objeto para almacenar los datos
  // Arreglo para los items de la lista
  listItems: any = [];
  // Arreglo para los items de la lista
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private listService: ListService,
              private userAuth: AngularFireAuth, private realtimeDatabbase: AngularFireDatabase, private nativeToast: ToastController) { }

  ngOnInit() {
    // Extrayendo los datos del query params
    this.activatedRoute.queryParams.subscribe((returnedData) => {
      this.dataExtractor1 = returnedData.accessCode;
    });
    // Extrayendo los datos del query params
    // Consumiendo datos del servicio
    this.listService.returnListByID(this.dataExtractor1).valueChanges().subscribe((returnedData) => {
      this.listData = returnedData;
      this.listItems = returnedData.listItems;
      console.log(returnedData.listItems);
    });
    // Consumiendo datos del servicio
  }
  // Funcion para eliminar un elemento de la lista
  async deleteItem(itemPosition) {
    // Removiendo items de la lista
    this.listItems.splice(itemPosition, 1);
    // Removiendo items de la lista
    // Conviritiendo arreglo en Objeto
    const resultObject = Object.assign({}, this.listItems);
    // Conviritiendo arreglo en Objeto
    // Extrayendo userID
    const userID = this.userAuth.auth.currentUser.uid;
    // Extrayendo userID
    // Actualizando la base de datos
    await this.realtimeDatabbase.database.ref('listAppPlatform/users/' + userID + '/userList/' + this.listData.listCode + '/listItems/').set(resultObject)
    // Actualizando la base de datos
    // Avisando sobre la eliminacion exitosa
    .then(async () => {
      // Desplegando el modal
      const deleteModal = await this.nativeToast.create({
        message: 'Item eliminado',
        position: 'bottom',
        color: 'butterColor',
        cssClass: 'customModal',
        animated: true,
        buttons: ['Aceptar']
      });
      deleteModal.present();
      // Desplegando el modal
    });
    // Avisando sobre la eliminacion exitosa
  }
  // Funcion para eliminar un elemento de la lista
  // Funcion para eliminar la lista
  async deleteList() {
    // Extrayendo userID
    const userID = this.userAuth.auth.currentUser.uid;
    // Extrayendo userID
    // Actualizando la base de datos
    await this.realtimeDatabbase.database.ref('listAppPlatform/users/' + userID + '/userList/' + this.listData.listCode + '/').remove()
    // Actualizando la base de datos
    // Avisando sobre la eliminacion exitosa
    .then(async () => {
      // Desplegando el modal
      const deleteModal = await this.nativeToast.create({
        message: 'Lista eliminada',
        position: 'bottom',
        color: 'butterColor',
        cssClass: 'customModal',
        animated: true,
        buttons: [
          {
            icon: 'checkmark',
            text: 'Aceptar',
            handler: () => {
              this.router.navigate(['/user-tabs']);
            }
          }
        ]
      });
      deleteModal.present();
      // Desplegando el modal
    })
    // Avisando sobre la eliminacion exitosa
  }
  // Funcion para eliminar la lista
}

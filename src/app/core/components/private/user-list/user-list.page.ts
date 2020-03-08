import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ListService } from 'src/app/core/services/list/list.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {
  // Arreglo para almacenar la lista de elementos
  shoppingList = [];
  // Arreglo para almacenar la lista de elementos
  // Variable para el formulario de busqueda
  searchForm: FormGroup;
  // Variable para el formulario de busqueda
  constructor(private router: Router, private nativeToast: ToastController, private listService: ListService,
              private userAuth: AngularFireAuth, private realtimeDatabase: AngularFireDatabase, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // Consumiendo datos del servicio
    this.listService.returnList().valueChanges().subscribe((returnedData) => {
      this.shoppingList = returnedData;
    });
    // Consumiendo datos del servicio
    // Inicializando formulario
    this.searchForm = this.formBuilder.group({
      searchParams: [''],
    })
    // Inicializando formulario
  }
  // Funcion para buscar las listas
  searchList() {
    // Extrayendo parametros de busqueda desde el formulario
    const searchParams = this.searchForm.value.searchParams;
    // Extrayendo parametros de busqueda desde el formulario
    // Realizando busqueda en el arreglo
    var searchPosition = this.shoppingList.map((returnedData) => { return returnedData.listTitle}).indexOf(searchParams)
    // Realizando busqueda en el arreglo
    if (searchParams == '') {
      this.listService.returnList().valueChanges().subscribe((returnedData) => {
        this.shoppingList = returnedData;
      });
    } else {
      if (searchPosition >= 0) {
        console.log(this.shoppingList[searchPosition]);
        const searchResult = this.shoppingList[searchPosition];
        this.shoppingList = [];
        this.shoppingList.push(searchResult);
      } else {
  
      }
    }
    // Limpiando el arreglo de listas
    // Limpiando el arreglo de listas


  }
  // Funcion para buscar las listas
  // Funcion para ir a la pagina de detalles
  goToDetails(listCode) {
    // Navegando a la ruta
    const objectData = {
      accessCode: JSON.stringify(listCode),
    };
    this.router.navigate(['/list-details'], {queryParams: objectData})
    // Navegando a la ruta
  }
  // Funcion para ir a la pagina de detalles
  // Funcion para eliminar una lista de compras
  async deleteList(listCode) {
    // Extrayendo userID
    const userID = this.userAuth.auth.currentUser.uid;
    // Extrayendo userID
    // Eliminando lista
    await this.realtimeDatabase.database.ref('listAppPlatform/users/' + userID + '/userList/' + listCode + '/').remove()
    // Eliminando lista
    // Avisando sobre la correcta eliminacion de la nota
    .then(async () => {
      // Desplegando modal
      const deleteModal = await this.nativeToast.create({
        message: 'Lista eliminada',
        position: 'bottom',
        color: 'butterColor',
        cssClass: 'customModal',
        animated: true,
        buttons: ['Aceptar']
      });
      deleteModal.present();
      // Desplegando modal
    });
    // Avisando sobre la correcta eliminacion de la nota
  }
  // Funcion para eliminar una lista de compras

}

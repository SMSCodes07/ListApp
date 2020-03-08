import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private userAuth: AngularFireAuth, private realtimeDatabase: AngularFireDatabase) { }
  // Metodo publico para retoranr las listas
  public returnList() {
    // Extrayendo userID
    const userID = this.userAuth.auth.currentUser.uid;    
    // Extrayendo userID
    // Retornando datos
    return this.realtimeDatabase.list('listAppPlatform/users/' + userID + '/userList/');
    // Retornando datos
  }
  // Metodo publico para retoranr las listas
  // Metodo publico para retornar las listas segun el ID
  public returnListByID(listCode) {
    // Extrayendo userID
    const userID = this.userAuth.auth.currentUser.uid;    
    // Extrayendo userID
    // Retornando datos
    return this.realtimeDatabase.object<{listCode: null, listCreationDate: null, listItems: {}, listTitle: null}>('listAppPlatform/users/' + userID + '/userList/' + listCode + '/');
    // Retornando datos
  }
  // Metodo publico para retornar las listas segun el ID
}

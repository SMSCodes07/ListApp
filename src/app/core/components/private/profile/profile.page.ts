import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  // Objeto para los datos del usuario
  userData = {
    userEmail: '',
    userName: '',
  };
  // Objeto para los datos del usuario
  constructor(private userAuth: AngularFireAuth) { }

  ngOnInit() {
    this.userData.userEmail = this.userAuth.auth.currentUser.email;
    this.userData.userName = this.userAuth.auth.currentUser.displayName;
  }
  
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController, AlertController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // Variable para el formulario de inicio de sesion
  loginForm: FormGroup;
  // Variable para el formulario de inicio de sesion

  constructor(private router: Router, private userAuth: AngularFireAuth, private realtimeDatabase: AngularFireDatabase,
              private formBuilder: FormBuilder, private nativeToast: ToastController, private nativeAlert: AlertController,
              private authService: AuthenticationService) { }

  ngOnInit() {
    // Inicializando el formulario de inicio de sesion
    this.loginForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(8)]],
    })    
    // Inicializando el formulario de inicio de sesion
  }
  // Funcion para inciar la sesion de un usuario
  async loginUser() {
    // Extrayendo datos del formulario
    const userEmail = this.loginForm.value.userEmail;
    const userPassword = this.loginForm.value.userPassword;
    // Extrayendo datos del formulario
    // Iniciando la sesion del usuario
    await this.userAuth.auth.signInWithEmailAndPassword(userEmail, userPassword)
    // Iniciando la sesion del usuario
    // En caso de un inicio de sesion exitoso, se ejecutara el siguiente bloque de codigo
    .then(async () => {
      // Extrayendo displayName
      var userName;
      const displayName = this.userAuth.auth.currentUser.displayName;
      if (displayName == null) {
        userName = '';
      } else {
        userName = displayName;
      }
      // Extrayendo displayName
      // Redireccionando a los usuarios
      const loginToast = await this.nativeToast.create({
        message: 'Bienvenid@ ' + userName,
        position: 'bottom',
        color: 'butterColor',
        cssClass: '.ProductSans',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.router.navigate(['/user-tabs']);
            }
          }
        ]
      });
      loginToast.present();
      // Redireccionando a los usuarios
    })
    // En caso de un inicio de sesion exitoso, se ejecutara el siguiente bloque de codigo
    // En caso de un error, se ejecutara la siguiente linea de codigo
    .catch(async (error) => {
      const errorCodes = error.code;
      switch (errorCodes) {
        case 'auth/invalid-email':
          const invalidToast = await this.nativeToast.create({
            message: 'La direccón de correo introducida es invalida',
            buttons: ['Aceptar'],
            color: 'danger'
          });
          invalidToast.present();
          break;
        case 'auth/user-disabled':
          const disabledToast = await this.nativeToast.create({
            message: 'Estimado usuario, la cuenta vinculada a la dirección de correo introducida ha sido inhabilitada',
            buttons: ['Aceptar'],
            color: 'danger'
          });
          disabledToast.present();
          break;
        case 'auth/user-not-found':
          const notUserToast = await this.nativeToast.create({
            message: 'No existe cuenta alguna vinculada a la dirección de correo introducida',
            buttons: ['Aceptar'],
            color: 'danger'
          });
          notUserToast.present();
          break;
        case 'auth/wrong-password':
          const wrongPasswordtoast = await this.nativeToast.create({
            message: 'Datos erróneos',
            buttons: ['Aceptar'],
            color: 'danger'
          });
          wrongPasswordtoast.present();
          break;
      }
    });
    // En caso de un error, se ejecutara la siguiente linea de codigo
  }
  // Funcion para inciar la sesion de un usuario
  // Funcion para ir al registro
  goToRegister() {
    this.router.navigate(['/register']);
  }
  // Funcion para ir al registro
  // Funcion para Recuperar la contraseña de los usuarios
  async showPasswordAlert() {
    const passwordAlert = await this.nativeAlert.create({
      header: 'Recuperación de cuentas',
      subHeader: 'Introduzca la dirección de correo electrónico vinculada a la cuenta que desea recuperar.',
      cssClass: 'ProductSans',
      inputs: [
        {
          name: 'emailInput',
          type: 'email',
          placeholder: 'Correo electrónico'
        }
      ],
      buttons: [
        {
          text: 'Enviar',
          handler: (data) => {
            const emailToRecover = data.emailInput;
            this.userAuth.auth.sendPasswordResetEmail(emailToRecover);
          }
        }
      ]
    });
    passwordAlert.present();
  }
  // Funcion para Recuperar la contraseña de los usuarios
}

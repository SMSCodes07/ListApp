import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirePerformance } from '@angular/fire/performance';
import { ToastController } from '@ionic/angular';
import { passwordValitadion } from '../../validators/authValidation';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  // Variable para el formulario de regitro
  registerForm: FormGroup;
  // Variable para el formulario de regitro
  constructor(private router: Router, private userAuth: AngularFireAuth, private realtimeDatabase: AngularFireDatabase,
              private appPerformance: AngularFirePerformance, private nativeToast: ToastController, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // Inicializando formulario de registro
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      userEmail: ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
      userPasswordMatch: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: passwordValitadion.passwordMatching })
    // Inicializando formulario de registro
  }
  // Funcion para la creacion de nuevos usuarios en la plataforma
  async createUser() {
    // Extrayendo datos del formulario
    const userName = this.registerForm.value.userName;
    const userEmail = this.registerForm.value.userEmail;
    const userPassword = this.registerForm.value.userPassword;
    // Extrayendo datos del formulario
    // Creando usuario en el sistema
    await this.userAuth.auth.createUserWithEmailAndPassword(userEmail, userPassword)
    // Creando usuario en el sistema
    // En caso de un registro exitoso se ejecutara este bloque de codigo
    .then(async () => {
      // Actualizando objeto del usuario
      this.userAuth.auth.onAuthStateChanged((userData) => {
        userData.updateProfile({
          displayName: userName
        });
      });
      // Actualizando objeto del usuario
      // Extrayendo ID del usuario segun Firebase
      const userID = this.userAuth.auth.currentUser.uid;
      // Extrayendo ID del usuario segun Firebase
      // Extrayendo la fecha y la hora de registro
      const newDate = new Date();
      const registerDate = (newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear());
      const registerTime = (newDate.getHours() + ':' + newDate.getMinutes());
      // Extrayendo la fecha y la hora de registro
      // Creando registro en la base de datos
      await this.realtimeDatabase.database.ref('listAppPlatform/users/' + userID + '/').set({
        userName: userName,
        userEmail:userEmail,
        userUID: userID,
        userList: '',
        userRegisterDate: registerDate,
        userRegisterTime: registerTime,
      })
      // Creando registro en la base de datos
      // Avisando al usuario sobre un registro exitoso
      .then(async () => {
        // Deplegando el toast
        const registerToast = await this.nativeToast.create({
          message: 'Registro exitoso',
          position: 'bottom',
          color: 'butterColor',
          cssClass: 'customModal',
          animated: true,
          buttons: [
            {
              icon: 'checkmark',
              text: 'Aceptar',
              handler: () => {
                this.router.navigate(['/login']);
              }
            }
          ]
        });
        registerToast.present();
        // Deplegando el toast
      });
      // Avisando al usuario sobre un registro exitoso
    })
    // En caso de un registro exitoso se ejecutara este bloque de codigo
    // En caso de un error duranteel registro, se ejecutara el siguente bloque de codigo
    .catch(async (error) => {
      const errorCodes = error.code;
      switch (errorCodes) {
        case 'auth/invalid-email':
          const invalidEmailToast = await this.nativeToast.create({
            message: 'Dirección de correo invalida',
            buttons: ['Aceptar']
          });
          invalidEmailToast.present();
          break;
        case 'auth/email-already-in-use':
          const emailInUseToast = await this.nativeToast.create({
            message: 'Correo en uso',
            buttons: ['Aceptar']
          });
          emailInUseToast.present();
          break;
        case 'auth/operation-not-allowed':
          const operationNotAllowedToast = await this.nativeToast.create({
            message: 'Registro inhabilitado',
            buttons: ['Aceptar']
          });
          operationNotAllowedToast.present();
          break;
        case 'auth/weak-password':
          const weakPasswordToast = await this.nativeToast.create({
            message: 'Contraseña débil',
            buttons: ['Aceptar']
          });
          weakPasswordToast.present();
          break;
      }
    })
    // En caso de un error duranteel registro, se ejecutara el siguente bloque de codigo
  }
  // Funcion para la creacion de nuevos usuarios en la plataforma
  // Funcion para cancelar el registro y volver al login
  goToLogin() {
    // Limpiando el formulario
    this.registerForm.reset();
    // Limpiando el formulario
    // Volviendo al login
    this.router.navigate(['/login']);
    // Volviendo al login
  }
  // Funcion para cancelar el registro y volver al login
}

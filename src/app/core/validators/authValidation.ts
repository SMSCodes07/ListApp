import { AbstractControl } from "@angular/forms";

// Clase para la validacion de la contraseña
export class passwordValitadion {
    // Metodo estatico para la validacion del formulario
    static passwordMatching(abstractControl: AbstractControl) {
        const userPassword = abstractControl.get('userPassword').value;
        const userPasswordMatch = abstractControl.get('userPasswordMatch').value;
        if (userPassword != userPasswordMatch) {
            abstractControl.get('userPasswordMatch').setErrors({passwordMatching: true})
        } else {
            return null;
        }
    }
    // Metodo estatico para la validacion del formulario
}
// Clase para la validacion de la contraseña
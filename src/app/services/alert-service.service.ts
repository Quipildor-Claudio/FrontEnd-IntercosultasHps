import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {
  private alertAfterRegistration: boolean = false;
  private alertPaciente:Boolean=false;
  constructor() { }

  showAlertAfterRegistration() {
    this.alertAfterRegistration = true;
  }

  shouldShowAlertAfterRegistration(): boolean {
    const showAlert = this.alertAfterRegistration;
    this.alertAfterRegistration = false; // Reset the flag after checking
    return showAlert;
  }

  showAlertPaciente(){
    this.alertPaciente = true;
  }
}

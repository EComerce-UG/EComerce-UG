import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TuiAlertService } from '@taiga-ui/core';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent {
  loginData = {
    username: '',
    password: '',
    rememberMe: false
  };
  private readonly alerts = inject(TuiAlertService);

  registerData = {
    email: ''
  };

  login() {
    // Implementar lógica de inicio de sesión
    console.log('Login attempt with:', this.loginData);
    this.alerts.open('Loggin, please hold on.', {label: 'Succesfully loggin.', appearance: 'positive'}).subscribe();
    // Aquí puedes agregar la llamada a tu servicio de autenticación
  }

  register() {
    // Implementar lógica de registro
    console.log('Register attempt with:', this.registerData);
    // Aquí puedes agregar la llamada a tu servicio de registro
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  // Datos del formulario
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  // Estado de envío
  isSubmitting = false;

  // Método para enviar el formulario
  submitForm() {
    if (this.isSubmitting) return;
    
    // Validación básica
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    this.isSubmitting = true;
    
    // Simular envío del formulario
    console.log('Formulario enviado:', this.formData);
    
    // Simular delay de envío
    setTimeout(() => {
      alert(`Gracias ${this.formData.name}, tu mensaje ha sido enviado exitosamente!`);
      
      // Resetear el formulario
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
      
      this.isSubmitting = false;
    }, 1000);
  }
}
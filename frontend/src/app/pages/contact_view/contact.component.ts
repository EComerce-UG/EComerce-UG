import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para soporte de formularios

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule // Solo necesario si usas ngModel
  ],
  templateUrl: './contact.component.html',
  // styleUrls: ['./contact.component.css'] // Opcional si necesitas estilos adicionales
})
export class ContactComponent {
  // Datos del formulario (opcional)
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  // Método para enviar el formulario
  submitForm() {
    console.log('Formulario enviado:', this.formData);
    // Aquí puedes agregar lógica para enviar los datos a tu backend
    alert(`Gracias ${this.formData.name}, tu mensaje ha sido enviado!`);
    
    // Resetea el formulario después de enviar
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }

  // Datos de features (opcional)
  features = [
    {
      icon: '🚚',
      title: 'Free Delivery',
      description: 'For all orders over $50'
    },
    {
      icon: '🔄',
      title: '90 Days Return',
      description: 'If goods have problems'
    },
    {
      icon: '🔒',
      title: 'Secure Payment',
      description: '100% secure payment'
    }
  ];
}
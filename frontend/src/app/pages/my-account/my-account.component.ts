import { Component, inject, OnInit } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { RouterLink, RouterLinkActive } from "@angular/router"
import { CommonModule } from "@angular/common"

import { TuiAlertService } from "@taiga-ui/core"
import { AuthService } from "../../service/auth.service"
import { LoginRequest, RegisterRequest, User } from "../../../interfaces"
import { UserService } from "../../service/user.service"

@Component({
  selector: "app-my-account",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: "./my-account.component.html",
  styleUrl: "./my-account.component.css",
})
export class MyAccountComponent implements OnInit {
  loginData = {
    username: "",
    password: "",
    rememberMe: false,
  };
  private curretUserData: User[] = [];
  private readonly alerts = inject(TuiAlertService)
  private readonly authService = inject(AuthService)
  private userService = inject(UserService);

  ngOnInit(): void { }

  registerData = {
    email: "",
    firstName: "",
    lastName: "",
    companyName: "",
    country: "Sri Lanka",
    streetAddress: "",
    townCity: "",
    province: "Western Province",
    zipCode: "",
    phone: "",
    emailAddress: "",
    additionalInformation: "",
    username: "",
    password: "",
  }

  showBillingForm = false
  isLoading = false

  login() {
    if (!this.loginData.username || !this.loginData.password) {
      this.alerts
        .open("Por favor complete todos los campos", {
          label: "Error",
          appearance: "error",
        })
        .subscribe()
      return
    }

    this.isLoading = true

    const loginRequest: LoginRequest = {
      usuario: this.loginData.username,
      password: this.loginData.password,
    }

    this.authService.login(loginRequest).subscribe({
      next: (response: any) => {
        this.isLoading = false
        this.alerts
          .open(`Bienvenido ${response.user.nombre}!`, {
            label: "Login exitoso",
            appearance: "positive",
          })
          .subscribe()

        // Limpiar formulario
        this.loginData = {
          username: "",
          password: "",
          rememberMe: false,
        }
        this.userService.changeCurrenLoginUser(true);
        this.curretUserData = response.user;
      },
      error: (error: any) => {
        this.isLoading = false
        const errorMessage = error.error?.error || "Error al iniciar sesión"
        this.alerts
          .open(errorMessage, {
            label: "Error de autenticación",
            appearance: "error",
          })
          .subscribe()
      },
    })
  }

  register() {
    if (!this.showBillingForm) {
      // Validar email antes de mostrar el formulario completo
      if (!this.registerData.email) {
        this.alerts
          .open("Por favor ingrese un email válido", {
            label: "Error",
            appearance: "error",
          })
          .subscribe()
        return
      }

      // Mostrar formulario de billing details
      this.showBillingForm = true
      this.registerData.emailAddress = this.registerData.email
      this.registerData.username = this.registerData.email // Usar email como username por defecto
    } else {
      // Validar campos requeridos
      if (!this.validateRegistrationForm()) {
        return
      }

      this.isLoading = true

      // Mapear datos del formulario al formato del backend
      const registerRequest: RegisterRequest = {
        nombre: this.registerData.firstName,
        apaterno: this.registerData.lastName,
        direccion: this.registerData.streetAddress,
        telefono: this.registerData.phone,
        ciudad: this.registerData.townCity,
        estado: this.registerData.province,
        usuario: this.registerData.username,
        password: this.registerData.password,
        likes: []
      }

      this.authService.register(registerRequest).subscribe({
        next: (response: any) => {
          this.isLoading = false
          this.alerts
            .open("Registro completado exitosamente!", {
              label: "¡Bienvenido!",
              appearance: "positive",
            })
            .subscribe()

          // Limpiar formulario y volver a la vista inicial
          this.resetRegistrationForm()
          this.userService.changeCurrenLoginUser(true);
        },
        error: (error: any) => {
          this.isLoading = false
          const errorMessage = error.error?.error || "Error al registrar usuario"
          this.alerts
            .open(errorMessage, {
              label: "Error de registro",
              appearance: "error",
            })
            .subscribe()
        },
      })
    }
  }

  private validateRegistrationForm(): boolean {
    const requiredFields = [
      { field: this.registerData.firstName, name: "Nombre" },
      { field: this.registerData.lastName, name: "Apellido" },
      { field: this.registerData.streetAddress, name: "Dirección" },
      { field: this.registerData.townCity, name: "Ciudad" },
      { field: this.registerData.phone, name: "Teléfono" },
      { field: this.registerData.emailAddress, name: "Email" },
      { field: this.registerData.username, name: "Usuario" },
      { field: this.registerData.password, name: "Contraseña" },
    ]

    for (const item of requiredFields) {
      if (!item.field || item.field.trim() === "") {
        this.alerts
          .open(`El campo ${item.name} es requerido`, {
            label: "Error de validación",
            appearance: "error",
          })
          .subscribe()
        return false
      }
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(this.registerData.emailAddress)) {
      this.alerts
        .open("Por favor ingrese un email válido", {
          label: "Error de validación",
          appearance: "error",
        })
        .subscribe()
      return false
    }

    // Validar contraseña (mínimo 6 caracteres)
    if (this.registerData.password.length < 6) {
      this.alerts
        .open("La contraseña debe tener al menos 6 caracteres", {
          label: "Error de validación",
          appearance: "error",
        })
        .subscribe()
      return false
    }

    return true
  }

  cancelBilling() {
    this.showBillingForm = false
    this.resetRegistrationForm()
  }

  private resetRegistrationForm() {
    this.registerData = {
      email: "",
      firstName: "",
      lastName: "",
      companyName: "",
      country: "Sri Lanka",
      streetAddress: "",
      townCity: "",
      province: "Western Province",
      zipCode: "",
      phone: "",
      emailAddress: "",
      additionalInformation: "",
      username: "",
      password: "",
    }
    this.showBillingForm = false
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.alerts
          .open("Sesión cerrada exitosamente", {
            label: "Logout",
            appearance: "info",
          })
          .subscribe()
          this.userService.changeCurrenLoginUser(false);
          this.userService.updateLikeCount(0);
      },
      error: (error: any) => {
        console.error("Error al cerrar sesión:", error)
      },
    })
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }

  get currentUser(): User | null {
    return this.authService.getCurrentUser()
  }
}

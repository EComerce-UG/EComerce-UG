import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { type Observable, BehaviorSubject } from "rxjs"
import { tap } from "rxjs/operators"

export interface LoginRequest {
  usuario: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface User {
  id: string
  nombre: string
  apaterno: string
  amaterno: string
  direccion: string
  telefono: string
  ciudad: string
  estado: string
  usuario: string
  password: string
  rol: "admin" | "recursos" | "marketing" | "usuario"
}

export interface RegisterRequest {
  nombre: string
  apaterno: string
  amaterno: string
  direccion: string
  telefono: string
  ciudad: string
  estado: string
  usuario: string
  password: string
  rol: "usuario"
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:5050/api" // Ajusta la URL según tu configuración
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  public currentUser$ = this.currentUserSubject.asObservable()

  constructor(private http: HttpClient) {
    // Verificar si hay un token guardado al inicializar el servicio
    this.checkStoredToken()
  }

  private checkStoredToken(): void {
    const token = localStorage.getItem("token")
    if (token) {
      this.getUserFromToken().subscribe({
        next: (response) => {
          this.currentUserSubject.next(response.user)
        },
        error: () => {
          // Token inválido, limpiar storage
          localStorage.removeItem("token")
          this.currentUserSubject.next(null)
        },
      })
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        // Guardar token en localStorage
        localStorage.setItem("token", response.token)
        this.currentUserSubject.next(response.user)
      }),
    )
  }

  register(userData: RegisterRequest): Observable<{ id: string }> {
    const headers = this.getAuthHeaders()
    return this.http.post<{ id: string }>(`${this.apiUrl}/users/create`, userData, { headers })
  }

  logout(): Observable<any> {
    const headers = this.getAuthHeaders()
    return this.http.post(`${this.apiUrl}/auth/logout`, {}, { headers }).pipe(
      tap(() => {
        localStorage.removeItem("token")
        this.currentUserSubject.next(null)
      }),
    )
  }

  getUserFromToken(): Observable<{ user: User }> {
    const headers = this.getAuthHeaders()
    return this.http.get<{ user: User }>(`${this.apiUrl}/auth/user`, { headers })
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("token")
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    })
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token")
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value
  }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

export interface LoginRequest {
  usuario: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  nombre: string;
  apaterno: string;
  direccion: string;
  telefono: string;
  ciudad: string;
  estado: string;
  usuario: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  apaterno: string;
  direccion: string;
  telefono: string;
  ciudad: string;
  estado: string;
  usuario: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:5050/api";
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(private http: HttpClient) {
    // Inicializar el usuario desde localStorage si existe
    const storedUser = localStorage.getItem("user");
    let parsedUser: User | null = null;
    if (storedUser && storedUser !== "undefined") {
      try {
        parsedUser = JSON.parse(storedUser);
      } catch {
        parsedUser = null;
      }
    }
    this.currentUserSubject = new BehaviorSubject<User | null>(parsedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.restoreUserFromToken();
  }

  private restoreUserFromToken(): void {
    const token = localStorage.getItem("token");
    if (token) {
      this.getUserFromToken().subscribe({
        next: (response) => {
          this.currentUserSubject.next(response.user);
          localStorage.setItem("user", JSON.stringify(response.user));
        },
        error: () => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          this.currentUserSubject.next(null);
        },
      });
    } else {
      localStorage.removeItem("user");
      this.currentUserSubject.next(null);
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      })
    );
  }

  register(userData: RegisterRequest): Observable<{ id: string }> {
    const headers = this.getAuthHeaders();
    return this.http.post<{ id: string }>(`${this.apiUrl}/users/create`, userData, { headers });
  }

  logout(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/auth/logout`, {}, { headers }).pipe(
      tap(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.currentUserSubject.next(null);
      })
    );
  }

  getUserFromToken(): Observable<{ user: User }> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ user: User }>(`${this.apiUrl}/auth/user`, { headers });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem("token");
    const user = this.getCurrentUser();
    return !!token && !!user;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}

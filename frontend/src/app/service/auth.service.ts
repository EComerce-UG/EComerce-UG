import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { type Observable, BehaviorSubject } from "rxjs"
import { tap } from "rxjs/operators"
import { LoginRequest, LoginResponse, ProductList, ProductListToCart, RegisterRequest, User } from "../../interfaces"
import { environment } from "../../environments/environment"
import { UserService } from "./user.service"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(private http: HttpClient, private userService: UserService) {
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
          this.currentUserSubject.next(response.user.user);
          localStorage.setItem("user", JSON.stringify(response.user));
          this.userService.setUserStructure(true, response.user.user.id, response.user.user.carrito, response.user.user.likes.length);
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
        this.userService.setUserStructure(true, response.user.id, response.user.carrito, response.user.likes.length);
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
        this.userService.setUserStructure(false, "", [], 0);
        this.currentUserSubject.next(null);
      })
    );
  }

  getUserFromToken(): Observable<{ user: LoginResponse }> {
    const headers = this.getAuthHeaders()
    return this.http.get<{ user: LoginResponse }>(`${this.apiUrl}/auth/user`, { headers })
  }

  getUserLikesInfo(userList:[]): Observable<{products: ProductList[]}> {
    const headers = this.getAuthHeaders();
    return this.http.post<{ products: ProductList[] }>(`${this.apiUrl}/users/getLikes`, {userList}, { headers }).pipe()
  }

  updateUserLikes(productId: number, userId: string): Observable<{status: boolean}> {
    const headers = this.getAuthHeaders();
    return this.http.post<{ status: boolean }>(`${this.apiUrl}/users/updateLikes`, { productId: productId, id: userId }, { headers }).pipe()
  }

  addLikeProductUser(productId: number, userId: string): Observable<{status: boolean}> {
    const headers = this.getAuthHeaders();
    return this.http.post<{ status: boolean }>(`${this.apiUrl}/users/addLikes`, {productId: productId, id: userId}, { headers }).pipe()
  }

  // agregando los productos a firebase
  addFirebaseCartUser(data:ProductListToCart): Observable<{status: boolean}> {
    const headers = this.getAuthHeaders();
    const userId = this.userService.userCurrentId.value;
    return this.http.post<{ status: boolean }>(`${this.apiUrl}/users/addCartProduct`, {productList: data, id: userId}, { headers }).pipe()
  }

  // eliminando los productos a firebase
  deleteFirebaseCartUser(): Observable<{status: boolean}> {
    const headers = this.getAuthHeaders();
    const userId = this.userService.userCurrentId.value;
    const newDataCart = this.userService.userToCardSelect.value;
    return this.http.post<{ status: boolean }>(`${this.apiUrl}/users/deleteCartProduct`, {productList: newDataCart, id: userId}, { headers }).pipe()
  }

  // terminar el carrito del usuario
  checkoutFirebaseCartUser(): Observable<{status: boolean}> {
    const headers = this.getAuthHeaders();
    const userId = this.userService.userCurrentId.value;
    return this.http.post<{ status: boolean }>(`${this.apiUrl}/users/checkoutCartUser`, {id: userId}, { headers }).pipe()
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

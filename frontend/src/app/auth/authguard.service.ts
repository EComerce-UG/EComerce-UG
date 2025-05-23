import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}

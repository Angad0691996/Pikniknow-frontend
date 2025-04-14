import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { IS_LOGIN } from "../constant/constants";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate() {
    let isLoggedIn = localStorage.getItem(IS_LOGIN) == "true"
    if (isLoggedIn) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

import {inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import * as firebase from "firebase/auth";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
class PermissionService{
  constructor(private authService:AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    return new Promise(
      (resolve, reject) => {
        firebase.onAuthStateChanged(
          firebase.getAuth(),
          (user) => {
            if(user) {
              resolve(true);
            } else {
              this.router.navigate(['/auth','signin'])
              resolve(false);
            }
          }
        )
      }
    )
  }
}
export const AuthGuardService: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean => {
  return inject(PermissionService).canActivate(route, state);
}

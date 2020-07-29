import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  user: Observable<firebase.User>;

  constructor(public router: Router) { }
  canActivate(): boolean {
    console.log("checkkinggg>>>>>>>.")
    if (!localStorage.getItem('email')) {
      this.router.navigate(["login"]);
      return false;
    } else {
      return true;
    }
  }
}

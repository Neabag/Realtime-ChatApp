import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import * as firebase from '@firebase/app';
@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"],
})
export class LoginFormComponent {
  email: string;
  password: string;
  errorMsg: string;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password).catch((error) => {
      this.errorMsg = error.message;
      if (this.errorMsg.includes("no user record")) {
        this.errorMsg = "User does not exist please Signup";
      } else if (this.errorMsg.includes("password")) {
        this.errorMsg = "Oops!!! Wrong Password, Try Again";
      }
    });
  }
  ngOnInit() {
    window.indexedDB.deleteDatabase('firebaseLocalStorageDb');
  }
}

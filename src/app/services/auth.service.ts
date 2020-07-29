import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";

import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: any;
  public authenticated: boolean;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.user = this.afAuth.authState;
  }

  authUser() {
    return this.user;
  }



  get currentUserID(): string {
    return this.authState != null ? this.authState.user.uid : "";
  }

  login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((resolve) => {
        const userId = resolve.user.uid;
        this.authState = resolve;
        // console.log(this.authState);
        const status = "online";
        this.setUserStatus(status, userId);
        this.authenticated = true;
        localStorage.setItem('email', email)
        this.router.navigate(["chat"]);
      });
  }

  signUp(email: string, password: string, dispalyName: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // console.log(user);
        this.authState = user;
        const status = "online";
        localStorage.setItem('email', email);
        this.setUserData(email, dispalyName, status);
        this.authenticated = true;
        this.router.navigate(["chat"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setUserData(email: string, displayName: string, status: string): void {
    const path = `users/${this.currentUserID}`;
    const data = {
      email: email,
      displayName: displayName,
      status: status,
    };
    this.db
      .object(path)
      .update(data)
      .catch((error) => console.log(error));
  }

  setUserStatus(status: string, userId: string): void {
    const path = `users/${userId}`;
    const data = {
      status: status,
    };
    this.db
      .object(path)
      .update(data)
      .catch((error) => console.log(error));
  }
  logout() {
    this.authenticated = false;
    this.afAuth.signOut();
    localStorage.removeItem('email')
    window.indexedDB.deleteDatabase('firebaseLocalStorageDb');
    if (this.authState) {
      const userId = this.authState.user.uid;
      this.setUserStatus("offline", userId);
    }
    this.router.navigate(["/login"]);

  }
}

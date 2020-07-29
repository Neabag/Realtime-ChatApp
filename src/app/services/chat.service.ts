import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

import { AngularFireDatabase, AngularFireList, AngularFireObject } from "@angular/fire/database";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import * as firebase from "firebase/app";

import { ChatMessage } from "../models/chat-message.model";
@Injectable({
  providedIn: "root",
})
export class ChatService {
  user: any;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((auth) => {
      console.log(auth);
      if (auth !== undefined && auth !== null) {
        this.user = auth;
        console.log(this.user);
        this.getUser().valueChanges().subscribe(data => {
          console.log(data);
          this.userName = data.displayName;
        });
      }

    });
  }
  getUser(): AngularFireObject<firebase.User> {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }

  sendMessage(message: string) {
    const timeStamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessage();
    this.chatMessages.push({
      message: message,
      timeSent: timeStamp,
      userName: this.userName,
      email: email,
    });
    console.log("called send messages");
  }
  getTimeStamp() {
    const now = new Date();
    const date =
      now.getFullYear() +
      "/" +
      (now.getMonth() + 1) +
      "/" +
      now.getDate();
    const time =
      now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    return date + " " + time;
  }
  getMessage(): AngularFireList<ChatMessage> {
    //query to create our message feed binding
    return this.db.list("/messages", (ref) => {
      let q = ref.limitToLast(25).orderByKey();
      return q;
    });
  }
}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
// import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AppComponent } from "./app.component";
import { ChatFormComponent } from "./chat-form/chat-form.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserItemComponent } from "./user-item/user-item.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { MessageComponent } from "./message/message.component";
import { SignupFormComponent } from "./signup-form/signup-form.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ChatroomComponent } from "./chatroom/chatroom.component";

import { appRoutes } from "../routes";

import { AuthService } from "./services/auth.service";
import { ChatService } from "./services/chat.service";

import { environment } from "../environments/environment";
import { AuthGuard } from "./services/auth-guard";

@NgModule({
  declarations: [
    AppComponent,
    ChatFormComponent,
    UserListComponent,
    UserItemComponent,
    LoginFormComponent,
    MessageComponent,
    SignupFormComponent,
    NavbarComponent,
    ChatroomComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [AuthService, ChatService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }

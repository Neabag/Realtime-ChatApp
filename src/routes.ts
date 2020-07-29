import { Routes } from "@angular/router";

import { SignupFormComponent } from "./app/signup-form/signup-form.component";
import { LoginFormComponent } from "./app/login-form/login-form.component";
import { ChatroomComponent } from "./app/chatroom/chatroom.component";
import { AuthGuard } from "./app/services/auth-guard";

export const appRoutes: Routes = [
  { path: "", canActivate: [AuthGuard], redirectTo: "/login", pathMatch: 'full' },
  { path: "signup", component: SignupFormComponent },
  { path: "login", component: LoginFormComponent },
  {
    path: "chat",
    component: ChatroomComponent,
    canActivate: [AuthGuard],
  },
  { path: "**", redirectTo: "/login" },
];

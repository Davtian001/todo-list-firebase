import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthScreenComponent } from "./components/auth-screen/auth-screen.component";

const routes: Routes = [
  {
    path: '',
    component: AuthScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthScreenRoutingModule { }

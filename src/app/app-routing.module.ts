import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from "./modules/auth/guards/auth.guard";
import { NoAuthGuard } from "./modules/auth/guards/no-auth.guard";

const routes: Routes = [
    {
        path: '', redirectTo: 'todo-list', pathMatch: 'full'
    },
    {
        path: 'auth',
        canActivate: [NoAuthGuard],
        canLoad: [NoAuthGuard],
        data: {
          guard: {
              routRedirectUrl: 'todo-list' // navigate if already legged in
          }
        },
        loadChildren: './modules/auth/modules/auth-screen/auth-screen.module#AuthScreenModule',
    },
    {
        path: 'todo-list',
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: './modules/todo-list/todo-list.module#TodoListModule'
    },
    {
        path: 'not-found',
        component: NotFoundComponent
    },
    {
        path: '**', redirectTo: 'not-found', pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksMainComponent } from "./components/tasks-main/tasks-main.component";

const routes: Routes = [
    {
        path: '',
        component: TasksMainComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodoListRoutingModule {
}

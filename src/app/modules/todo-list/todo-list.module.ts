import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TodoListRoutingModule } from './todo-list-routing.module';
import { TasksMainComponent } from "./components/tasks-main/tasks-main.component";
import {
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatMenuModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule, MatSortModule, MatTableModule, MatPaginatorModule, MatDialogModule,
} from '@angular/material';
import { ConfirmDialogModule } from "../../shared/modules/modals/confirm-dialog/confirm-dialog.module";
import { CreateTaskComponent } from "./components/create-task/create-task.component";
import { TaskService } from "./services/task.service";
import { TaskActionsComponent } from "./components/task-actions/task-actions.component";
import { TASK_ACTION, TASK_ACTION_DATA } from "./tokens/task-action.const";
import { EditTaskDialogComponent } from "./modals/edit-task-dialog/edit-task-dialog.component";
import { ControlMessageModule } from "../../shared/modules/forms/control-message/control-message.module";

@NgModule({
    declarations: [
        TasksMainComponent,
        CreateTaskComponent,
        TaskActionsComponent,
        EditTaskDialogComponent
    ],
    imports: [
        CommonModule,
        TodoListRoutingModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatMenuModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ConfirmDialogModule,
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
        FormsModule,
        MatDialogModule,
        ControlMessageModule
    ],
    exports: [
        TasksMainComponent,
        CreateTaskComponent,
        TaskActionsComponent
    ],
    entryComponents: [
        EditTaskDialogComponent
    ],
    providers: [
        TaskService,
        {
            provide: TASK_ACTION,
            useValue: TASK_ACTION_DATA
        }
    ]
})

export class TodoListModule {
}

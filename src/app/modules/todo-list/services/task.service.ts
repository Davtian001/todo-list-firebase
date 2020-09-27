import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, tap } from 'rxjs/operators';
import { Task } from '../models/task.model';
import { TaskRequestModel } from "../models/task-request.model";
import Reference = firebase.database.Reference;

@Injectable()
export class TaskService {
    currentUserUid: string;

    constructor(
        private firebase: AngularFireDatabase,
    ) {
    }

    getTasksWithIds(): Observable<Task[]> {
        return this.firebase.list(`tasks/${this.currentUserUid}`).snapshotChanges()
            .pipe(
                map(tasksData => tasksData.map(task => new Task({...(task.payload.val() as any).task, id: task.key,}))),
            );
    }

    addTask(payload: TaskRequestModel): Promise<void | Reference> {
        return this.firebase.list(`tasks/${this.currentUserUid}`)
            .push({task: Object.assign({}, payload)}) // remove model type (Firebase validation)
            .catch();
    }

    updateTask(taskId: string, payload: Task): Promise<void> {
        return this.firebase.object(`tasks/${this.currentUserUid}/${taskId}/task`).update(payload).catch();
    }

    toggleTask(taskId: string, state: boolean): Promise<void> {
        return this.firebase.object(`tasks/${this.currentUserUid}/${taskId}/task`).update({done: state}).catch();
    }

    deleteTaskById(taskId: string): Promise<void> {
        return this.firebase.object(`tasks/${this.currentUserUid}/${taskId}`).remove().catch();
    }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Task } from "../../models/task.model";

@Component({
    selector: 'app-edit-task-dialog',
    templateUrl: './edit-task-dialog.component.html',
    styleUrls: ['./edit-task-dialog.component.scss'],
})
export class EditTaskDialogComponent implements OnInit {
    editTaskForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
    }

    ngOnInit() {
        this.initEditForm();
    }

    get editedTask(): Task {
        return Object.assign(this.data, this.editTaskForm.value);
    }

    private initEditForm(): void {
        this.editTaskForm = this.formBuilder.group({
            name: this.formBuilder.control('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
            ]),
            description: this.formBuilder.control('', [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(1000)
            ]),
        });
        this.editTaskForm.patchValue(this.data);
    }
}

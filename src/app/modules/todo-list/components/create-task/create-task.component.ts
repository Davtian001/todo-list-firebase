import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { TaskService } from "../../services/task.service";
import { ThemePalette } from "@angular/material";
import { TaskRequestModel } from "../../models/task-request.model";

@Component({
    selector: 'add-task-panel',
    templateUrl: './create-task.component.html',
    styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
    datePickerTheme: ThemePalette = 'primary';
    currentDate = new Date();
    createTaskForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private taskService: TaskService
    ) {
    }

    ngOnInit() {
        this.initCreateTaskForm();
    }

    get name(): AbstractControl {
        return this.createTaskForm.get('name');
    }

    get description(): AbstractControl {
        return this.createTaskForm.get('description');
    }

    get startDate(): AbstractControl {
        return this.createTaskForm.get('startDate');
    }

    get endDate(): AbstractControl {
        return this.createTaskForm.get('endDate');
    }

    createTask(): void {
        this.taskService.addTask(new TaskRequestModel(this.createTaskForm.value))
            .then(() => {
                this.createTaskForm.reset();
            })
            .catch();
    }

    private initCreateTaskForm(): void {
        this.createTaskForm = this.formBuilder.group({
            name: this.formBuilder.control('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
            ]),
            description: this.formBuilder.control('', [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(1600)
            ]),
            startDate: this.formBuilder.control('', Validators.required),
            endDate: this.formBuilder.control('', Validators.required)
        })
    }
}

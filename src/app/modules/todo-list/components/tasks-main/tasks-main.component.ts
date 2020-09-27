import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from "../../services/task.service";
import { Task } from '../../models/task.model';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthMessages } from '../../../auth/constatnt/popup-messages.constant';
import { User } from '../../../../interfaces/user.interface';
import { Router } from '@angular/router';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { filter, first, tap } from "rxjs/operators";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { get as getProperty } from 'lodash';
import { ConfirmDialogService } from '../../../../shared/modules/modals/confirm-dialog/services/confirm-dialog.service';
import { TaskAction } from "../../models/task-action.model";
import { TaskActionTypeEnum } from '../../enums/task-action-type.enum';
import { EditTaskDialogComponent } from '../../modals/edit-task-dialog/edit-task-dialog.component';
import { isEqual } from 'lodash';
import { GET_TEST_DATA } from "../../constants/mock-data";

@Component({
    selector: 'app-tasks-main',
    templateUrl: './tasks-main.component.html',
    styleUrls: ['./tasks-main.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class TasksMainComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    pageSize = 10;
    isLoadingResults = false;
    columnsToDisplay: string[] = [
        'name', 'startDate', 'endDate', 'status', 'actions'
    ];
    expandedElement: Task | null;
    dataSource: MatTableDataSource<Task>;
    private subscriptions = new Subscription();
    private tasks: Map<string, Task>;

    constructor(
        private taskService: TaskService,
        private confirmDialogService: ConfirmDialogService,
        private authService: AuthService,
        private router: Router,
        private dialog: MatDialog,
    ) {
    }

    ngOnInit() {
        this.setUserUid()
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    get currentUser(): User {
        return this.authService.currentUser;
    }

    trackById(index, task: Task): string {
        return task.id;
    }

    applyTableFilter(searchValue: string) {
        if (searchValue === '' || searchValue) {
            this.dataSource.filter = searchValue.trim().toLowerCase();
        }
    }

    onSelectAction(action: TaskAction, task: Task): void {
        switch (action.type) {
            case TaskActionTypeEnum.Edit:
                this.editedTask(task);
                break;
            case TaskActionTypeEnum.Complete:
                task.done = true;
                this.toggleTask(task);
                break;
            case TaskActionTypeEnum.Pending:
                task.done = false;
                this.toggleTask(task);
                break;
            case TaskActionTypeEnum.Delete:
                this.deleteTask(task);
                break;
        }
    }

    signOut() {
        this.confirmDialogService.openConfirmMessage({
            message: AuthMessages.logOut(),
            accept: () => this.logOut(),
        })
    }

    deleteTask(task: Task): void {
        this.confirmDialogService.openConfirmMessage({
            message: [`Delete Task <${task.name}> ?`],
            accept: () => this.taskService.deleteTaskById(task.id)
        });
    }

    toggleTask(task: Task): void {
        this.taskService.toggleTask(task.id, task.done);
    }

    toggleExpandedElement(element: Task): void {
        this.expandedElement = this.expandedElement === element ? null : element;
    }

    setExpandedElement(element: Task): void {
        this.expandedElement = element;
    }

    editedTask(task: Task): void {
        this.setExpandedElement(task); // expand row

        const dialogRef = this.dialog.open(EditTaskDialogComponent, {
            width: '410px',
            height: '390px',
            data: Object.assign({}, task) // new reference
        });
        dialogRef.afterClosed()
            .pipe(
                first(),
                filter(editedTask => !!editedTask),
                filter(editedTask => !isEqual(editedTask, task)), // check is changed any property of object while sending request
            )
            .subscribe(editedTask => {
                this.taskService.updateTask(task.id, editedTask)
                    .then(() => Object.assign(task, editedTask));
            });
    }

    private setDataSourceConfigs(): void {
        this.initTableSort();
        this.overrideTableFilter();
        this.initTablePagination();
    }

    private initTablePagination(): void {
        this.dataSource.paginator = this.paginator;
        const dataSub = this.paginator.page
            .pipe(
                tap(() => window.scrollTo({top: 0, behavior: 'smooth'})),
            ).subscribe();
        this.subscriptions.add(dataSub);
    }

    private logOut() {
        this.authService.signOut()
            .then(() => {
                this.router.navigate(['/auth'])
            });
    }

    private setUserUid(): void {
        const authSub = this.authService.authState$
            .pipe(
                filter(user => !!user)
            )
            .subscribe(user => {
                this.taskService.currentUserUid = user.uid;
                this.getTasks();
            });

        this.subscriptions.add(authSub);
    }

    private getTasks(): void {
        this.isLoadingResults = true;
        const tasksSub = this.taskService.getTasksWithIds()
            .subscribe(this.handleTaskData.bind(this));
        this.subscriptions.add(tasksSub);
    }

    private handleTaskData(tasks: Task[]): void {
        this.tasks = new Map();
        tasks.forEach(task => this.tasks.set(task.id, task));
        this.checkForExpandedRow();
        this.setDataSource(tasks);
        this.isLoadingResults = false;
        this.setDataSourceConfigs();

        if (!tasks.length) {
            this.pushMockData();
        }
    }

    // created for testing
    private pushMockData(): void {
        GET_TEST_DATA.forEach(item => {
            this.taskService.addTask(item as any);
        });
    }

    private checkForExpandedRow(): void {
        if (this.expandedElement) {
            this.setExpandedElement(this.tasks.get(this.expandedElement.id))
        }
    }

    private overrideTableFilter(): void {
        this.dataSource.filterPredicate = (row: Task, filter: string) => {
            return row.name.toLowerCase().includes(filter);
        };
    }

    private initTableSort(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = getProperty;
        this.sort.active = 'startDate';
        this.sort.direction = 'desc';
    }

    private setDataSource(adaptedDate: Task[]): void {
        this.dataSource = new MatTableDataSource(adaptedDate);
    }
}

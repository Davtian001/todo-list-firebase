import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { Task } from "../../models/task.model";
import { TaskAction } from "../../models/task-action.model";
import { TASK_ACTION } from "../../tokens/task-action.const";
import { TaskActionTypeEnum } from "../../enums/task-action-type.enum";

@Component({
  selector: 'app-task-actions',
  templateUrl: './task-actions.component.html',
  styleUrls: ['./task-actions.component.scss'],
  inputs: ['task'],
  outputs: ['onSelectAction'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskActionsComponent implements OnInit {
  task: Task;
  onSelectAction = new EventEmitter<TaskAction>();

  constructor(
     @Inject(TASK_ACTION) public taskActions: TaskAction[]
  ) {}

  ngOnInit() {
    this.checkForStatus();
  }

  private checkForStatus(): void {
    const excludeType = this.task.done ? TaskActionTypeEnum.Complete : TaskActionTypeEnum.Pending;
    this.taskActions = this.taskActions.filter(action => action.type !== excludeType);
  }
}

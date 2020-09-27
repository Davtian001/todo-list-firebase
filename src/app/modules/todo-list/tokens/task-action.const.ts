import { InjectionToken } from "@angular/core";
import { TaskAction } from "../models/task-action.model";
import { TaskActionTypeEnum } from "../enums/task-action-type.enum";

export const TASK_ACTION = new InjectionToken<TaskAction[]>('Task Actions');
export const TASK_ACTION_DATA = [
    new TaskAction({
        type: TaskActionTypeEnum.Edit,
        name: 'Edit',
        icon: 'edit'
    }),
    new TaskAction({
        type: TaskActionTypeEnum.Complete,
        name: 'Complete',
        icon: 'done'
    }),
    new TaskAction({
        type: TaskActionTypeEnum.Pending,
        name: 'Pending',
        icon: 'hourglass_full'
    }),
    new TaskAction({
        type: TaskActionTypeEnum.Delete,
        name: 'Delete',
        icon: 'delete_forever'
    })
];

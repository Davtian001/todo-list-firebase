import { TaskActionTypeEnum } from "../enums/task-action-type.enum";

export class TaskAction {
    type: TaskActionTypeEnum;
    name: string;
    icon: string;

    constructor(data: TaskAction) {
        Object.assign(this, data)
    }
}

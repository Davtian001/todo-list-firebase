export class TaskRequestModel {
    name: string;
    startDate: number;
    endDate: number;
    description: string;
    done: boolean;

    constructor(data) {
        this.name = data.name;
        this.startDate = data.startDate.getTime();
        this.endDate = data.endDate.getTime();
        this.description = data.description;
        this.done = false;
    }
}

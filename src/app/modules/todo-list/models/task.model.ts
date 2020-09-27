export class Task {
    id: string;
    name: string;
    done: boolean;
    startDate: number;
    endDate: number;
    description: string;
    expired: boolean;

    constructor(data) {
        Object.assign(this, data);
        this.expired = this.endDate < new Date().getTime();
    }
}

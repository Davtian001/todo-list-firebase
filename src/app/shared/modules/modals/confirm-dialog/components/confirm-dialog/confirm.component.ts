import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmMessage } from "../../interfaces/confirm-message.interface";

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public options: ConfirmMessage
    ) {
    }
}

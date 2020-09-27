import { Component, OnDestroy } from '@angular/core';
import { DialogService } from "../../services/dialog.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-auth-actions',
    templateUrl: './auth-actions.component.html',
    styleUrls: ['./auth-actions.component.scss'],
})
export class AuthActionsComponent implements OnDestroy {
    private subscriptions = new Subscription();

    constructor(
        private dialogService: DialogService,
    ) {
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    signIn() {
        this.dialogService.openSignIn();
    }

    signUp() {
        this.dialogService.openSignUp();
    }
}

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { ResetPassComponent } from '../components/reset-password/reset-pass.component';
import { first } from "rxjs/operators";
import { ConfirmMessage } from "../../../shared/modules/modals/confirm-dialog/interfaces/confirm-message.interface";
import { AlertMessage } from "../../../shared/modules/modals/confirm-dialog/interfaces/alert-message.interface";
import { ConfirmDialogService } from "../../../shared/modules/modals/confirm-dialog/services/confirm-dialog.service";
import { AuthDialogEnum } from "../enums/auth-dialog.enum";

@Injectable()
export class DialogService {
    constructor(
        private dialog: MatDialog,
        private confirmDialogService: ConfirmDialogService
    ) {
    }

    redirect(options) {
        if (!options) return;
        switch (options.to) {
            case AuthDialogEnum.SignIn:
                this.openSignIn();
                break;
            case AuthDialogEnum.SignUp:
                this.openSignUp();
                break;
            case AuthDialogEnum.ResetPassword:
                this.openResetPass();
                break;
            case AuthDialogEnum.Confirm:
                this.openConfirmMessage(options.confirmOptions);
                break;
            case AuthDialogEnum.Alert:
                this.openAlertMessage(options.alertOptions);
                break;
        }
    }

    openSignUp(): void {
        const dialogRef = this.dialog.open(SignUpComponent, {
            width: '500px',
            autoFocus: true,
            disableClose: true,
            panelClass: 'custom-dialog-class',
        });
        dialogRef.afterClosed()
            .pipe(
                first()
            )
            .subscribe(to => {
                this.redirect(to)
            })
    }

    openSignIn(): void {
        const dialogRef = this.dialog.open(SignInComponent, {
            width: '400px',
            autoFocus: true,
            disableClose: true,
            panelClass: 'custom-dialog-class',
        });

        dialogRef.afterClosed()
            .pipe(
                first()
            )
            .subscribe((to) => {
                this.redirect(to)
            });
    }

    openResetPass(): void {
        const dialogRef = this.dialog.open(ResetPassComponent, {
            width: '400px',
            autoFocus: true,
            disableClose: true,
            panelClass: 'custom-dialog-class',
        });

        dialogRef.afterClosed()
            .pipe(
                first()
            )
            .subscribe(to => {
                this.redirect(to)
            })
    }

    openConfirmMessage(options: ConfirmMessage): void {
        this.confirmDialogService.openConfirmMessage(options);
    }

    openAlertMessage(options: AlertMessage): void {
        this.confirmDialogService.openAlertMessage(options, this.redirect.bind(this));
    }
}

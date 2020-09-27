import { Component } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AuthService } from "../../services/auth.service";
import { AuthMessages } from "../../constatnt/popup-messages.constant";
import { Observable, of } from "rxjs";
import { delay, map, switchMap } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthDialogEnum } from "../../enums/auth-dialog.enum";

@Component({
    selector: 'app-reset-pass',
    templateUrl: './reset-pass.component.html',
    styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent {
    email = new FormControl('', [
        Validators.required, Validators.email,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
    ], [this.isValidEmail.bind(this)]);

    constructor(
        private authService: AuthService,
        private dialogRef: MatDialogRef<ResetPassComponent>,
        private fireAuth: AngularFireAuth,
    ) {
    }

    resetPassword(): void {
        this.authService.resetPassword(this.email.value).then(() => {
            this.dialogRef.close({
                to: AuthDialogEnum.Alert,
                alertOptions: {
                    message: AuthMessages.resetPassSucces(this.email.value),
                    after: AuthDialogEnum.SignIn,
                }
            })
        }).catch(() => this.resetPassword())
    }

    private isValidEmail(control: AbstractControl): Observable<ValidationErrors> {
        return of(control.value).pipe(
            delay(500),
            switchMap(email => this.fireAuth.auth.fetchSignInMethodsForEmail(email)),
            map(isExist => isExist.length ? null : {async: {message: 'This email is not registered'}}),
        )
    }
}

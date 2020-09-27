import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AuthService } from "../../services/auth.service";
import { AuthDialogEnum } from "../../enums/auth-dialog.enum";
import { Router } from "@angular/router";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss', '../dialog-main.scss'],
})
export class SignInComponent implements OnInit {
    processing: boolean;
    hidePassword: boolean = true;
    rememberMe: FormControl = new FormControl(false);
    signInForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private dialogRef: MatDialogRef<SignInComponent>,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.initForm();
    }

    signIn() {
        this.processing = true;
        this.authService.signIn(this.signInForm.controls.email.value, this.signInForm.controls.password.value, this.rememberMe.value)
            .then(() => {
                this.router.navigate([this.authService.routRedirectUrl || '/']) // navigate on last blocked route saved inside the Auth guard
                    .then(() => this.dialogRef.close());
            })
            .catch()
            .finally(() => this.processing = false)
    }

    toSignUp() {
        this.dialogRef.close({to: AuthDialogEnum.SignUp});
    }

    toResetPassword() {
        this.dialogRef.close({to: AuthDialogEnum.ResetPassword})
    }

    private initForm(): void {
        this.signInForm = this.formBuilder.group({
            email: ['davit_2014@list.ru', [Validators.email, Validators.required]],
            password: ['davit_2014@list.ru', [Validators.required, Validators.minLength(8)]],
        })
    }
}

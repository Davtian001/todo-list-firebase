import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Subject, of, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, map, tap, delay, takeUntil } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';
import { passwordConfirm } from '../../validators/confirm-pass';
import { AuthService } from "../../services/auth.service";
import { AuthDialogEnum } from "../../enums/auth-dialog.enum";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss', '../dialog-main.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
    hidePassword = true;
    processing: boolean;
    registerForm: FormGroup;
    busyEmailError: boolean;
    submitted: boolean;
    private destroyStream$ = new Subject<void>();

    constructor(
        public dialogRef: MatDialogRef<SignUpComponent>,
        public formBuilder: FormBuilder,
        private authService: AuthService,
        private fireAuth: AngularFireAuth,
    ) {
    }

    ngOnInit() {
        this.initForm();
    }

    ngOnDestroy() {
        this.destroyStream$.next();
        this.destroyStream$.complete();
    }

    get fullName(): AbstractControl {
        return this.registerForm.get('fullName');
    }

    get email(): AbstractControl {
        return this.registerForm.get('email')
    }

    get password(): AbstractControl {
        return this.registerForm.get('password')
    }

    get passConfirm(): AbstractControl {
        return this.registerForm.get('passwordConfirm')
    }

    prevent(): false {
        return false;
    }

    toSignIn() {
        this.dialogRef.close({to: AuthDialogEnum.SignIn})
    }

    onSubmit() {
        if (this.registerForm.invalid) {
            for (let control in this.registerForm.controls) {
                this.registerForm.controls[control].markAsTouched();
            }
            return
        }
        this.register();
    }

    private register() {
        this.processing = true;
        this.authService.signUp(this.registerForm.value)
            .then(() => {
                this.submitted = false;
                this.toSignIn();
            })
            .catch()
            .finally(() => this.processing = false)
    }

    private initForm(): void {
        this.registerForm = this.formBuilder.group({
            fullName: this.formBuilder.control('', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(20)
            ]),
            email: this.formBuilder.control('', [
                Validators.required,
                Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
            ], this.isBusyEmail.bind(this)),
            password: this.formBuilder.control('', [
                Validators.required,
                Validators.minLength(8),
            ]),
            passwordConfirm: this.formBuilder.control(''),
        });

        this.passConfirm.setValidators([passwordConfirm(this.password), Validators.required]);
        this.password.valueChanges
            .pipe(
                tap(() => this.passConfirm.updateValueAndValidity()),
                takeUntil(this.destroyStream$)
            ).subscribe();
    }

    private isBusyEmail(control: AbstractControl): Observable<ValidationErrors> {
        return of(control.value).pipe(
            delay(500),
            map((value: string) => value.toLowerCase()),
            switchMap(email => this.fireAuth.auth.fetchSignInMethodsForEmail(email)),
            map(isBusy => isBusy.length ? {async: {message: 'This email was already registered'}} : null),
            tap(isBusy => this.busyEmailError = !!isBusy)
        )
    }
}

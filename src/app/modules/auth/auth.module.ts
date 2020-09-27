import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule
} from '@angular/material';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ResetPassComponent } from './components/reset-password/reset-pass.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthActionsComponent } from './components/auth-actions/auth-actions.component';
import { RouterModule } from '@angular/router';
import { DialogService } from "./services/dialog.service";
import { ConfirmDialogModule } from "../../shared/modules/modals/confirm-dialog/confirm-dialog.module";
import { ControlMessageModule } from "../../shared/modules/forms/control-message/control-message.module";
// @ts-ignore
import { NgxMaskModule } from 'ngx-mask'

@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent,
        ResetPassComponent,
        AuthActionsComponent,
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        RouterModule,
        MatButtonModule,
        MatCheckboxModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        ConfirmDialogModule,
        ControlMessageModule,
        NgxMaskModule.forRoot(),
    ],
    entryComponents: [
        SignInComponent,
        SignUpComponent,
        ResetPassComponent,
    ],
    exports: [
        AuthActionsComponent,
    ],
    providers: [
        DialogService
    ]
})
export class AuthModule {
}

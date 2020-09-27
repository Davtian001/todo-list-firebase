import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from "../../auth.module";
import { RouterModule } from "@angular/router";
import { MatButtonModule, MatToolbarModule } from "@angular/material";
import { ConfirmDialogModule } from "../../../../shared/modules/modals/confirm-dialog/confirm-dialog.module";
import { AuthScreenComponent } from "./components/auth-screen/auth-screen.component";
import { AuthScreenRoutingModule } from "./auth-screen-routing.module";

@NgModule({
    declarations: [
        AuthScreenComponent
    ],
    imports: [
        CommonModule,
        AuthModule,
        RouterModule,
        MatToolbarModule,
        ConfirmDialogModule,
        MatButtonModule,
        AuthScreenRoutingModule
    ],
})
export class AuthScreenModule {
}

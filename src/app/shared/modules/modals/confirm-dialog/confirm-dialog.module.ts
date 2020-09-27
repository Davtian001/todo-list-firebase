import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule } from "@angular/material";
import { AlertComponent } from "./components/alert/alert.component";
import { ConfirmComponent } from "./components/confirm-dialog/confirm.component";
import { ConfirmDialogService } from "./services/confirm-dialog.service";

@NgModule({
  declarations: [
    ConfirmComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    ConfirmComponent,
    AlertComponent
  ],
  entryComponents: [
    ConfirmComponent,
    AlertComponent
  ],
  providers: [
    ConfirmDialogService
  ]
})
export class ConfirmDialogModule { }

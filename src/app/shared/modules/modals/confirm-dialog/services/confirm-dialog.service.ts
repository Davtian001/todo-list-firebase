import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material";
import { ConfirmMessage } from "../interfaces/confirm-message.interface";
import { ConfirmComponent } from "../components/confirm-dialog/confirm.component";
import { AlertMessage } from "../interfaces/alert-message.interface";
import { AlertComponent } from "../components/alert/alert.component";
import { first } from "rxjs/operators";

@Injectable()
export class ConfirmDialogService {

  constructor(
      private dialog: MatDialog
  ) {
  }

  openConfirmMessage(options: ConfirmMessage): void {
    this.dialog.open(ConfirmComponent, {
      data: options,
      disableClose: true,
      panelClass: 'primary-dialog-class',
    })
  }

  openAlertMessage(options: AlertMessage, onClose: (value) => void): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: options,
      disableClose: false,
      panelClass: 'primary-dialog-class',
      autoFocus: true
    });

    dialogRef.afterClosed()
        .pipe(
            first()
        )
        .subscribe(onClose)
  }
}

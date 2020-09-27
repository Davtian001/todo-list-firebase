import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AlertMessage } from "../../interfaces/alert-message.interface";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  constructor(
      private dialogRef: MatDialogRef<AlertComponent>,
      @Inject(MAT_DIALOG_DATA) public options: AlertMessage
  ){
  }

  close(){
    this.dialogRef.close({to: this.options.after})
  }
}

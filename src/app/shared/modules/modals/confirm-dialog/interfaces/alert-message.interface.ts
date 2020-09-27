import { AuthDialogEnum } from "../../../../../modules/auth/enums/auth-dialog.enum";

export interface AlertMessage {
    message: string[];
    after: AuthDialogEnum;
}

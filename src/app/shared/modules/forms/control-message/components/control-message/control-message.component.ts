import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl } from "@angular/forms";
import { FORM_ERROR_MESSAGES } from "../../configs/forn-errors.config";
import { merge, Observable } from "rxjs";
import { map, startWith, tap } from "rxjs/operators";

@Component({
    selector: 'app-control-message',
    templateUrl: './control-message.component.html',
    styleUrls: ['./control-message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    inputs: ['control']
})
export class ControlMessageComponent implements OnInit {
    message$: Observable<string>;
    private control: AbstractControl;

    constructor(
        @Inject(FORM_ERROR_MESSAGES) private errors: { [key: string]: (config: any) => string }
    ) {
    }

    ngOnInit() {
        this.setErrorListener();
    }

    private getErrorText(control: AbstractControl): string {
        if (!control.errors) return '';
        const [key, error] = this.getFirstError(control);
        const getText = this.errors[key];
        return getText ? getText(error) : '';
    }

    private getFirstError(control: AbstractControl): [string, object] {
        return Object.entries(control.errors)[0];
    }

    private setErrorListener(): void {
        this.message$ = merge(
            this.control.valueChanges,
            this.control.statusChanges
        ).pipe(
            startWith(''),
            map(() => this.getErrorText(this.control))
        )
    }
}

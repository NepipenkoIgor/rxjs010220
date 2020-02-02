import { userService } from "./user.service";
import { combineLatest, EMPTY, fromEvent, Observable, of } from "rxjs";
import { debounceTime, map, pluck, switchMap, withLatestFrom } from "rxjs/operators";


export class FormComponent {
    private values$: Observable<any>;
    private input: HTMLInputElement;
    private saveButton: HTMLButtonElement;

    public constructor(public formContainer: HTMLFormElement) {
        this.input = formContainer.querySelector('input');
        this.saveButton = formContainer.querySelector('button');
        this.values$ = combineLatest([
            fromEvent<InputEvent>(this.input, 'input').pipe(pluck('target', 'value')),
            userService.uniqNameSequence$
        ]).pipe(
            debounceTime(300),
            switchMap(([value, names]) => {
                const isNotValid = names.find((name) => name === value);
                if (isNotValid) {
                    this.input.classList.add('error');
                    this.saveButton.disabled = true;
                    return EMPTY;
                }
                this.input.classList.remove('error');
                this.saveButton.disabled = false;
                return of(value)
            })
        );
        fromEvent<MouseEvent>(this.saveButton, 'click')
            .pipe(
                withLatestFrom(this.values$),
                map(([, value]) => value)
            ).subscribe((value) => {
            console.log(value);
        })
    }
}

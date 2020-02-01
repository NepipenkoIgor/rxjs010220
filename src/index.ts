import { ajax, AjaxResponse } from "rxjs/ajax";
import { debounceTime, map } from "rxjs/operators";
import { forkJoin, fromEvent, Observable } from "rxjs";


const request$ = ajax('http://learn.javascript.ru/courses/groups/api/participants?key=1i7qske')
    .pipe(
        map((res: AjaxResponse) => res.response),
    );

forkJoin([request$, request$]).subscribe(([req1, req2]) => {
    console.log(req1, req2);
})

// const input = document.querySelector('input')
// const search$: Observable<string> = fromEvent<InputEvent>(input, 'input')
//     .pipe(
//         debounceTime(300),
//         map((e: InputEvent) => {
//             return (e.target as HTMLInputElement).value;
//         })
//     )
// search$.subscribe((v) => {
//     console.log(v);
// })

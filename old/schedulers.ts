import { combineLatest, from, interval, of, Subject } from "rxjs";
import { asap } from "rxjs/internal/scheduler/asap";
import { async } from "rxjs/internal/scheduler/async";
import { queue } from "rxjs/internal/scheduler/queue";
import { map, observeOn, subscribeOn, take, tap } from "rxjs/operators";

// console.log('Start');
// setTimeout(() => console.log('timeout 1'));
// setTimeout(() => console.log('timeout 2'));
// interval(1000)
//     .subscribe((value) => {
//         console.log(value)
//     });
// Promise.resolve().then(() => console.log('promise 1'));
// Promise.resolve().then(() => console.log('promise 2'));
// console.log('End');

// ---Start----(timeout 1)--(timeout 2)---
//    End
//    promise 1
//    promise 2
// const a$ = from([1, 2], async);
// const b$ = of(10);
// const c$ = combineLatest([a$, b$])
//     .pipe(
//         map(([x, y]) => x + y)
//     )
// c$.subscribe((res) => {
//     console.log(res);
// })
//
// const signal$$ = new Subject();
// let count = 0;
// const someCalc = (value) => console.log(`do some calculation with ${value}`);
// console.log('Start');
// console.time('Process')
// signal$$
//     .pipe(
//         observeOn(queue),
//         take(1600)
//     )
//     .subscribe(() => {
//         someCalc(count);
//         signal$$.next(count++);
//     },()=>{},()=>{
//         console.timeEnd('Process')
//     });
// signal$$.next(count++);
// console.log('End');


setTimeout(() => console.log('It will be run as MacroTask'));
const sequence$ = of(1, 2, 3)
    .pipe(
        tap((v) => console.log(v)),
        subscribeOn(async),
    );
sequence$.subscribe((v) => {
    console.log('Value ', v);
    Promise.resolve().then(() => console.log('MicroTask value ', v));
    setTimeout(() => console.log('MacroTask value ', v));
})

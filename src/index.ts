import { from, interval, Observable, Subscriber } from "rxjs";
import { filter } from "rxjs/operators";

// const sequence$ = new Observable();
// sequence$.source = interval(2000);
// sequence$.operator = {
//     call(subscriber: Subscriber<unknown>, source: any): void {
//         source.subscribe(subscriber);
//     }
// }
//
// sequence$.subscribe((v) => {
//     console.log(v);
// })

const sequence$ = from([1, 2, 3, 4, 5])

class DoubleSubscribe extends Subscriber<number> {
    next(value: number): void {
        super.next(value * 2);
    }
}

// sequence$.subscribe(new DoubleSubscribe((v) => console.log(v)))

// const double = (source: Observable<number>) => {
//     const sequence$ = new Observable();
//     sequence$.source = source;
//     sequence$.operator = {
//         call(subscriber: Subscriber<unknown>, source: any): void {
//             source.subscribe(new DoubleSubscribe(subscriber));
//         }
//     }
//     return sequence$;
// }

const double = (source: Observable<number>) => {
    return source.lift({
        call(subscriber: Subscriber<unknown>, source: any): void {
            source.subscribe(new DoubleSubscribe(subscriber));
        }
    })
}

const pipe = (...fns: Function[]) => (source: Observable<any>) =>
    fns.reduce((acc, fn) => fn(acc), source);

const doubleWithFilter = pipe(
    double,
    filter((v: number) => v % 3 === 0)
)

sequence$.pipe(doubleWithFilter)
    .subscribe((v) => {
        console.log(v);
    })

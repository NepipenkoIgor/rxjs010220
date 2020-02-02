import { interval, of, zip } from "rxjs";
import { catchError, delay, map, retry, retryWhen, switchMap, tap } from "rxjs/operators";

const sequence1$ = interval(1000);
const sequence2$ = of('1', '2', '3', 4, '5', '6');
zip(sequence1$, sequence2$)
    .pipe(
        switchMap(([_x, y]) => {
            return of(y)
                .pipe(map((y) => {
                        return (y as any).toUpperCase();
                    }),
                    catchError((err, obs) => {
                        console.log(err);
                        return of('0');
                    }),
                )
        })
// tap(() => {
//     console.log('After map')
// }),
//     retryWhen((err$) => err$.pipe(delay(5000))),
//     catchError((err, obs) => {
//         console.log(err);
//         return of('0');
//     }),
// tap(()=>{
//     console.log('After error')
// })
    ).subscribe(
    (v) => {
        console.log(v)
    },
    (err) => {
        console.log(err)
    },
    () => {
        console.log('Completed')
    },
);

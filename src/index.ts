import { interval, of } from "rxjs";
import { map, skip, take, tap } from "rxjs/operators";

const sequence1$ = interval(1000);
/*
sequence$  --0--1--2--3--4--
      tap((x)=>x**2)
           --0--1--2--3--4--
      map((x)=>x**2)
           --0--1--4--9--16--
      tap((x)=>x**2)
sequence2$ --0--1--4--9--16--

 */
// const sequence2$ = sequence$.pipe(
//     tap((x) => x.name = 'Vlad'),
//     map((x) => ({...x, age: 33})),
//     tap((x) => x.age = 44));
// sequence2$
//     .subscribe((v) => {
//         console.log(v);
//     })


/*
 sequence$   --0--1--2--3--4--5--6--7--8--
            skip(4)
             --------------4--5--6--7--8--
            take(3)
             --------------4--5--6|
 */
sequence1$
    .pipe(
        skip(4),
        take(3)
    )
    .subscribe((v) => {
        console.log(v);
    })

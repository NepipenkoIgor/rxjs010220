import { AsyncSubject, Observable } from "rxjs";
import { ajax } from "rxjs/ajax";

// const sequence$$ = new AsyncSubject();
// sequence$$.subscribe((v)=>console.log('Sub 1', v));
// sequence$$.subscribe((v)=>console.log('Sub 2', v));
//
// sequence$$.next(1);
// sequence$$.next(2);
// sequence$$.next(3);
// sequence$$.next(4);
//
// setTimeout(()=>{
//     sequence$$.complete();
//     sequence$$.subscribe((v)=>console.log('Sub 3', v));
// }, 5000)

function getItems(url) {
    let subject;
    return new Observable((subscriber) => {
        if (!subject) {
            subject = new AsyncSubject();
            ajax(url).subscribe(subject);
        }
        return subject.subscribe(subscriber)
    })
}

const items$ = getItems('http://learn.javascript.ru/courses/groups/api/participants?key=1i7qske')

items$.subscribe((v) => {
    console.log(v);
})

setTimeout(() => {
    items$.subscribe((v) => {
        console.log(v);
    })
}, 5000)

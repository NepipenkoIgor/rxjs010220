import { Observable } from "rxjs";

const sequence = new Observable((subscriber) => {
    console.log('Internal')
    let count = 1;
    const intervalID = setInterval(() => {
        subscriber.next(count++);
        if (count === 10) {
            subscriber.complete();
            clearInterval(intervalID);
        }
    }, 1000)
});

setTimeout(() => {
    sequence.subscribe((v) => {
        console.log('Sub 2', v);
    }, ()=>{}, ()=>{})
}, 5000);
//
sequence.subscribe((v) => {
    console.log('Sub 1', v);
}, ()=>{}, ()=>{})

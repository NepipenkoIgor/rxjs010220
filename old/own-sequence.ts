import { Observable } from "rxjs";

const sequence = new Observable((subscriber) => {
    console.log('Internal')
    subscriber.next(1);
    document.addEventListener('click', (e: MouseEvent) => {
        subscriber.next(e.clientX);
    })
});

setTimeout(() => {
    sequence.subscribe((v) => {
        console.log('Sub 2', v);
    }, () => {
    }, () => {
    })
}, 5000);
//
sequence.subscribe((v) => {
    console.log('Sub 1', v);
}, () => {
}, () => {
})

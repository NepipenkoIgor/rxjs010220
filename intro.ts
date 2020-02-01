// const sequence = new Promise((res) => {
//     let count = 1;
//     setInterval(() => {
//         res(count++);
//     }, 100)
// });
// sequence.then((v) => console.log(v));
// sequence.then((v) => console.log(v));
// setTimeout(() => {
//     sequence.then((v) => console.log(v));
// }, 5000);


// const sequence2 = function* iteratorFunction() {
//     let item = 1;
//     while (true) {
//         yield item++;
//     }
// }();
//
// console.log(sequence2.next().value);
// console.log(sequence2.next().value);
// console.log(sequence2.next().value);
// setTimeout(() => {
//     console.log(sequence2.next().value);
// }, 5000);


import { interval } from "rxjs";

interval(1000)
    .subscribe((v) => {
        console.log(v);
    })

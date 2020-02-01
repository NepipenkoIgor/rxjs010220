import { bindNodeCallback, from, Observable, of } from "rxjs";
import util from 'util';
import fs from 'fs';
import { buffer, map } from "rxjs/operators";

// const message$: Observable<string> = of('Rx', 'is', 'awesome');
//
// message$.subscribe((v) => {
//     console.log(v);
// })


// const readfile$ = from(util.promisify(fs.readFile)(`${__dirname}/text`))
//
// readfile$
//     .pipe(
//         map((buffer) => {
//             const str = buffer.toString();
//             const regExp = />([^<]+)</;
//             const matches = regExp.exec(str);
//             return matches && matches[1]
//         })
//     ).subscribe((v) => {
//     console.log(v);
// });

// const readFile = bindNodeCallback(fs.readFile); // `${__dirname}/text`))
//
// readFile(`${__dirname}/text`)
//     .pipe(
//         map((buffer) => {
//             const str = buffer.toString();
//             const regExp = />([^<]+)</;
//             const matches = regExp.exec(str);
//             return matches && matches[1]
//         })
//     ).subscribe((v) => {
//     console.log(v);
// });

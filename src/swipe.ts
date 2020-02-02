
import { fromEvent, zip } from "rxjs";
import { map } from "rxjs/operators";

const touchStart$ = getX(fromEvent<TouchEvent>(document, 'touchstart'));
const touchEnd$ = getX(fromEvent<TouchEvent>(document, 'touchend'));
const swipe$ = swipe(zip(touchStart$, touchEnd$));
swipe$.subscribe((value) => {
    if (value > 0) {
        console.log('Swipe left');
        return;
    }
    console.log('Swipe right');
});


export function getX(source$) {
    return source$
        .pipe(
            map(({changedTouches}: TouchEvent) => changedTouches[0].clientX)
        )
}

export function swipe(source1$) {
    return source1$
        .pipe(
            map(([starX, endX]: [number, number]) => {
                return starX - endX;
            })
        )
}

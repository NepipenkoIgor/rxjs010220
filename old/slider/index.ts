import { combineLatest, fromEvent, Observable } from "rxjs";
import { map, startWith, tap, withLatestFrom } from "rxjs/operators";

const initialValue = 5;
const quality$ = getValue(fromEvent($('#quality').slider(), 'change'), initialValue, colorizeSlider);
const rating$ = getValue(fromEvent($('#rating').slider(), 'change'), initialValue, colorizeSlider);
const actual$ = getValue(fromEvent($('#actual').slider(), 'change'), initialValue, colorizeSlider);

const result$ = combineLatest([quality$, rating$, actual$])
    .pipe(
        map(([quality, rating, actual]: number[]) => {
            return Math.round((quality + rating + actual) / 3 * 10);
        })
    );

function getValue(source$, initialValue, sideCb): Observable<number> {
    return source$.pipe(
        map(({value: {newValue}, delegateTarget: {previousElementSibling}}: any) => {
            return {value: newValue, element: previousElementSibling}
        }),
        tap(sideCb),
        map(({value}) => value),
        startWith(initialValue)
    )
}

fromEvent<MouseEvent>(document.querySelector('#send-result'), 'click')
    .pipe(
        withLatestFrom(result$),
        map(([_e, value]: [MouseEvent, number]) => value)
    )
    .subscribe((result) => {
        console.log(result);
    })

function colorizeSlider({value, element}) {
    const slider = element.querySelector('.slider-track');
    const v = value * 10;
    slider.classList.remove('bad', 'good', 'warn');
    if (v < 40) {
        slider.classList.add('bad');
        return
    }
    if (v >= 40 && v <= 70) {
        slider.classList.add('warn');
        return
    }
    slider.classList.add('good');
}

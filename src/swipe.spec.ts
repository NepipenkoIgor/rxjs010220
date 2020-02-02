import { TestScheduler } from "rxjs/testing";
import { skipLimit } from "./skip-limit";
import { getX, swipe } from "./swipe";
import { zip } from "rxjs";

function createTouchEvent(clientX: number) {
    return new TouchEvent('event', {
        changedTouches: [
            new Touch({clientX, identifier: 1, target: new EventTarget()})]
    })
}

describe('Test Swipe', () => {
    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected)
        })
    })
    it('getX should transform right', () => {
        testScheduler.run(({hot, expectObservable}) => {
            const sequence$ = hot('-a--b----c--|', {
                a: createTouchEvent(10),
                b: createTouchEvent(1),
                c: createTouchEvent(2),
            })
            const expected = '-a--b----c--|';
            expectObservable(
                getX(sequence$)
            ).toBe(expected, {a: 10, b: 1, c: 2})
        })
    })
    it('swipe should  work', () => {
        testScheduler.run(({hot, expectObservable}) => {
            const touchStart$ = hot('-a---b-------|', {
                a: createTouchEvent(10),
                b: createTouchEvent(1),
            });
            const touchEnd$ = hot('---d------c--|', {
                d: createTouchEvent(4),
                c: createTouchEvent(20),
            });
            const expected = '---d------c--|';
            expectObservable(
                swipe(zip(getX(touchStart$), getX(touchEnd$)))
            ).toBe(expected, {d: 6, c: -19})
        })
    })
});

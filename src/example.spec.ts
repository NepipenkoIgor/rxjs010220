import { TestScheduler } from "rxjs/testing";
import { delay } from "./example";
import { map } from "rxjs/operators";

describe('RxJS base test', () => {
    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected)
        })
    })
    it('first test', () => {
        testScheduler.run(({cold, expectObservable}) => {
            const sequence$ = cold('--a--b--c----|', {a: 2, b: 3, c: 5})
            const expected = '            9s --a--b--c----|';
            expectObservable(
                sequence$.pipe(
                    delay(9000, testScheduler),
                    map((value) => value ** 2)
                )
            ).toBe(expected, {a: 4, b: 9, c: 25})
        })
    })
});

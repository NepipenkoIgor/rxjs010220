import { TestScheduler } from "rxjs/testing";
import { skipLimit } from "./skip-limit";

describe('RxJS base test', () => {
    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected)
        })
    })
    it('skip limit test', () => {
        testScheduler.run(({cold, expectObservable}) => {
            const sequence$ = cold('-a--b----c----d---e-|', {a: 2, b: 3, c: 5, d: 10, e: 6})
            const expected = '              ---------c----d-----|';
            expectObservable(
                sequence$.pipe(
                    skipLimit(2, 2)
                )
            ).toBe(expected, {c: 5, d: 10})
        })
    })
});

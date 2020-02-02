import { Observable, Subscriber } from "rxjs";

class SkipLimitSubscriber extends Subscriber<any> {

    private _interval = 1;
    private _count = 1;

    constructor(subscriber: Subscriber<any>, private  _skip: number, private _limit: number) {
        super(subscriber);
    }

    public next(value: any): void {
        const borderLeft = this._interval * (this._skip + this._limit) - this._limit;
        const borderRight = borderLeft + this._limit;
        if (borderLeft < this._count && this._count <= borderRight) {
            super.next(value);
            this._count++;
            if (borderRight < this._count) {
                this._interval++;
            }
            return;
        }
        this._count++;
    }
}

export function skipLimit<T>(skip: number, limit: number) {
    return (source: Observable<T>) => {
        return source.lift({
            call(subscriber: Subscriber<T>, source: Observable<T>): void {
                source.subscribe(new SkipLimitSubscriber(subscriber, skip, limit))
            }
        })
    }
}

class Observable {
    private readonly _subscribe: any;

    constructor(subscriber) {
        if (subscriber) {
            this._subscribe = subscriber;
        }
    }

    subscribe(onNext: Function, error?: Function, complete?: Function) {
        return this._subscribe({
            onNext,
            error,
            complete
        })
    }
}

const sequence = new Observable((subscriber) => {
    console.log('Internal')
    let count = 1;
    const intervalID = setInterval(() => {
        subscriber.onNext(count++);
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
// sequence.subscribe((v) => {
//     console.log('Sub 1', v);
// }, ()=>{}, ()=>{})

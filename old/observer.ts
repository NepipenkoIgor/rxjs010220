class Producer {
    private listeners: any[] = [];

    public subscribe(listener: any) {
        const index = this.listeners.push(listener);
        return {
            unsubscribe: () => {
                this.listeners.splice(index - 1, 1)
            }
        }
    }

    public notify(value: any) {
        this.listeners.forEach((listener) => {
            listener.next(value);
        });
    }
}

const listener1 = {
    next: (value: any) => {
        console.log('Listener 1 received ', value);
    }
}


const listener2 = {
    next: (value: any) => {
        console.log('Listener 2 received ', value);
    }
}

const producer = new Producer();

const subscribe1 = producer.subscribe(listener1);
const subscribe2 = producer.subscribe(listener2);
producer.notify('JS is awesome');
subscribe1.unsubscribe();

setTimeout(() => {
    producer.notify('TS is awesome');
}, 5000);

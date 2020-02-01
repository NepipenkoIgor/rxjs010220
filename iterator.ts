class Iterator1 {
    private cursor: number = 0;
    private value;

    constructor(private arr: any[], private divisor: number = 1) {
    }

    public next() {
        while (this.cursor < this.arr.length) {
            this.value = this.arr[this.cursor++];
            if (this.value % this.divisor === 0) {
                return {done: false, value: this.value}
            }
        }
        return {done: true, value: this.value};
    }

    [Symbol.iterator]() {
        return {
            next: this.next.bind(this)
        }
    }
}

const consumer = new Iterator1([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)

// console.log(consumer.next());
// console.log(consumer.next());
// console.log(consumer.next());
// console.log(consumer.next());
// console.log(consumer.next());

// for(let item of consumer) {
//     console.log(item)
// }

console.log(Array.from(consumer as any).map((v) => {
    return (v as any) ** 2;
}))

import { BehaviorSubject, ReplaySubject, Subject } from "rxjs";

class CartService {
    private cartSequence$ = new BehaviorSubject({id: 0});

    public setProductToCart(product) {
        this.cartSequence$.next(product)
    }

    public getCartProducts() {
        return this.cartSequence$.asObservable()
    }
}

export const service = new CartService();

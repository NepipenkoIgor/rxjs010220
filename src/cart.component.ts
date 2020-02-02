import { service } from "./cart.service";

service.getCartProducts().subscribe((product)=>{
    console.log(product)
})

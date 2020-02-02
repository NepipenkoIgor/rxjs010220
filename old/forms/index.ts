import { userService } from "./user.service";
import { FormComponent } from "./form.component";

const form1 = document.querySelector('.first-form') as HTMLFormElement;
const form2 = document.querySelector('.second-form') as HTMLFormElement;
form2.hidden = true;
new FormComponent(form1);

setTimeout(()=>{
    form2.hidden = false;
    new FormComponent(form2);
}, 5000)

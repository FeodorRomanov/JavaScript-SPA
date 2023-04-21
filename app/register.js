import {
    html,
    render,
    page,
    until
} from "../api/lib.js"
import { createSubmitHandler, register } from "../api/users.js"





const template=(onRegister)=>html`<section id="register">
<div class="form">
  <h2>Register</h2>
  <form @submit=${onRegister} class="login-form">
    <input type="text" name="email" id="register-email" placeholder="email" />
    <input type="password" name="password" id="register-password" placeholder="password" />
    <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
    <button type="submit">register</button>
    <p class="message">Already registered? <a href="/login">Login</a></p>
  </form>
</div>
</section>`



export function showRegister(ctx){
    ctx.render(template(createSubmitHandler(onRegister)))


    async function onRegister(data){
        await register(data)
        ctx.update()
        ctx.page.redirect(`/dashboard`)
    }
}
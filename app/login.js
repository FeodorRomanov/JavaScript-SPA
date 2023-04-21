import {
    html,
    render,
    page,
    until
} from "../api/lib.js"
import { createSubmitHandler, login } from "../api/users.js"




const template=(onLogin)=>html`<section id="login">
<div class="form">
  <h2>Login</h2>
  <form @submit=${onLogin} class="login-form">
    <input type="text" name="email" id="email" placeholder="email" />
    <input type="password" name="password" id="password" placeholder="password" />
    <button type="submit">login</button>
    <p class="message">
      Not registered? <a href="/register">Create an account</a>
    </p>
  </form>
</div>
</section>`



export function showLogin(ctx){
    ctx.render(template(createSubmitHandler(onLogin)))

    async function onLogin(data){
        await login(data)
        ctx.update()
        ctx.page.redirect(`/dashboard`)
    }
}
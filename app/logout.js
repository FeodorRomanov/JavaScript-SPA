import {
    html,
    render,
    page,
    until
} from "../api/lib.js"
import { logout } from "../api/users.js"



export async function showLogout(ctx){
    await logout()
    ctx.update()
    ctx.page.redirect(`/dashboard`)
}
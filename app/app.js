import {
    html,
    render,
    page,
    until
} from "../api/lib.js"
import { getCurrUser } from "../api/users.js"
import { showCreate } from "./create.js"
import { showDashboard } from "./dashboard.js"
import { showDetails } from "./details.js"
import { showEdit } from "./edit.js"
import { showHome } from "./home.js"
import { showLogin } from "./login.js"
import { showLogout } from "./logout.js"
import { showRegister } from "./register.js"

const main=document.querySelector(`main`)

page(navigator)
page(`/`,showHome)
page(`/dashboard`,showDashboard)
page(`/register`,showRegister)
page(`/login`,showLogin)
page(`/logout`,showLogout)
page(`/create`,showCreate)
page(`/edit/:id`,showEdit)
page(`/details/:id`,showDetails)
update()
page.redirect(`/`)
page.start()




function navigator(ctx){
    ctx.render=(section)=>render(section,main)
    ctx.update=update
}



async function update(){
    const user=await getCurrUser()
    if(user){
        document.querySelector(`div[class=user]`).style.display=`block`
        document.querySelector(`div[class=guest]`).style.display=`none`
    }else{
        document.querySelector(`div[class=user]`).style.display=`none`
        document.querySelector(`div[class=guest]`).style.display=`block`
    }
}
import {
    html,
    render,
    page,
    until
} from "../api/lib.js"
import { createSubmitHandler, editOffer, getUserById } from "../api/users.js"



const template=(onEdit,currUser)=>html`<section id="edit">
<div class="form">
  <h2>Edit Album</h2>
  <form @submit=${onEdit} class="edit-form">
    <input type="text" value="${currUser.singer}" name="singer" id="album-singer" placeholder="Singer/Band" />
    <input type="text" value="${currUser.album}" name="album" id="album-album" placeholder="Album" />
    <input type="text" value="${currUser.imageUrl}" name="imageUrl" id="album-img" placeholder="Image url" />
    <input type="text" value="${currUser.release}" name="release" id="album-release" placeholder="Release date" />
    <input type="text" value="${currUser.label}" name="label" id="album-label" placeholder="Label" />
    <input type="text" value="${currUser.sales}" name="sales" id="album-sales" placeholder="Sales" />

    <button type="submit">post</button>
  </form>
</div>
</section>`



export async function showEdit(ctx){
    const id=ctx.params.id
    const currUser=await getUserById(id)
    ctx.render(template(createSubmitHandler(onEdit),currUser))


    async function onEdit(data){
        await editOffer(id,data)
        ctx.page.redirect(`/details/${id}`)
    }
}
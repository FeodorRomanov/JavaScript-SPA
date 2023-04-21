import {
    html,
    render,
    page,
    until
} from "../api/lib.js"
import { deleteOffer, getCurrUser, getUserById } from "../api/users.js"



const template=(data,check,onDelete)=>html`<section id="details">
<div id="details-wrapper">
  <p id="details-title">Album Details</p>
  <div id="img-wrapper">
    <img src="${data.imageUrl}" alt="example1" />
  </div>
  <div id="info-wrapper">
    <p><strong>Band:</strong><span id="details-singer">${data.singer}</span></p>
    <p>
      <strong>Album name:</strong><span id="details-album">${data.album}</span>
    </p>
    <p><strong>Release date:</strong><span id="details-release">${data.release}</span></p>
    <p><strong>Label:</strong><span id="details-label">${data.label}</span></p>
    <p><strong>Sales:</strong><span id="details-sales">${data.sales}</span></p>
  </div>
  <div id="likes">Likes: <span id="likes-count">0</span></div>

  ${check ? html`<div id="action-buttons">
  <a href="javascript:void(0)" id="like-btn">Like</a>
  <a href="/edit/${data._id}" id="edit-btn">Edit</a>
  <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
</div>` : html`<div id="action-buttons">
<a href="javascript:void(0)" id="like-btn">Like</a>
</div>`}
</div>
</section>`



export async function showDetails(ctx){
    const id=ctx.params.id
    const currUser=await getUserById(id)
    const user=await getCurrUser()
    const check=user && currUser._ownerId == user._id
    ctx.render(template(currUser,check,onDelete))

    async function onDelete(ev){
        ev.preventDefault()
        const cnf=confirm(`Are you sure you want to delete this song?`)
        if(confirm){
            await deleteOffer(id)
            ctx.page.redirect(`/dashboard`)
        }
    }
}
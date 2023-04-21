import {
    html,
    render,
    page,
    until
} from "../api/lib.js"
import { getAllUsers } from "../api/users.js"





const template=(data)=>html`<section id="dashboard">
<h2>Albums</h2>
<ul class="card-wrapper">
  <!-- Display a li with information about every post (if any)-->
  ${data.length>0 ? data.map(data=>html`<li class="card">
  <img src="${data.imageUrl}" alt="travis" />
  <p>
    <strong>Singer/Band: </strong><span class="singer">${data.singer}</span>
  </p>
  <p>
    <strong>Album name: </strong><span class="album">${data.album}</span>
  </p>
  <p><strong>Sales:</strong><span class="sales">${data.sales}</span></p>
  <a  class="details-btn" href="/details/${data._id}">Details</a>
</li>`) : html`<h2>There are no albums added yet.</h2>`}
</ul>
</section>`



export async function showDashboard(ctx){
    debugger
    const allData=await getAllUsers()
    ctx.render(template(allData))
}
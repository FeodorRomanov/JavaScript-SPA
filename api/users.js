import {post,get, del, put} from "./api.js"

export async function login(data){
    const user=await post('/users/login',data)
    sessionStorage.setItem(`userData`,JSON.stringify(user))
}

export async function register(data){
    const user=await post('/users/register',data)
    sessionStorage.setItem(`userData`,JSON.stringify(user))
}

export async function logout(){
    await get(`/users/logout`)
    sessionStorage.removeItem(`userData`)
}

export async function editOffer(id,data){
    await put(`/data/albums/${id}`,data)
}

export async function getAllApplications(offerId){
   return await get(`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`)
}

export async function getSpecifficApplication(offerId,userId){
    return await get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}

export async function Apply(offerId){
    await post(`/data/albums`,offerId)
}

export async function createOffer(data){
    await post(`/data/albums`,data)
}

export async function deleteOffer(id){
    await del(`/data/albums/${id}`)
}

export async function getCurrUser(){
    return JSON.parse(sessionStorage.getItem(`userData`))
}

export async function getUserById(id){
    return await get(`/data/albums/${id}`)
}

export async function getAllUsers(){
    return await get("/data/albums?sortBy=_createdOn%20desc")
}

export function createSubmitHandler(callback){
    return function(event){
        debugger
        event.preventDefault()
        const formdata=new FormData(event.target)
        const data=Object.fromEntries(formdata)
        try{
            if(Object.values(data).some(el => el == undefined || el==null || el==``)){
                throw new Error(`missing fields`)
            }
        }catch(error){
            alert (error.message)
            throw error
        }


        if(event.target.parentElement.parentElement.getAttribute('id')==`register`){
            const rePass=formdata.get(`re-password`)
            try{
            if(rePass!=data.password){
                throw new Error(`not same passwords`)
            }}catch(error){
                alert(error.message)
                throw error
            }
        }


        callback(data)
    }
}
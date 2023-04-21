const host=`http://localhost:3030`

async function request(method,url,data){
    const option={
        method,
        headers:{}
    }

    if(data!=undefined){
        option.headers["Content-Type"]="application/json"
        option.body=JSON.stringify(data)
    }

    
    const user=JSON.parse(sessionStorage.getItem(`userData`))

    if(user){
        const token=user.accessToken
        option.headers["X-Authorization"]=token
    }


    try{
        const promise=await fetch(host + url,option)
        if(promise.ok!=true){
            if(promise.status==403){
                sessionStorage.removeItem(`userData`)
            }
            const error=await promise.json()
            throw new Error(error.message)
        }


        if(promise.status==204){
            return promise
        }else{
            return promise.json()
        }


    }catch(error){
        alert(error.message)
        throw error
    }
}

const get=request.bind(null,`get`)
const post=request.bind(null,`post`)
const put=request.bind(null,`put`)
const del=request.bind(null,`delete`)

export{
    get,
    post,
    put,
    del
}
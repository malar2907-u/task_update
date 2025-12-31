interface loginPayload {
    userName: string,
    password: string
}

export async function LoginService(payload : loginPayload) {
    const response = await fetch("/api/login" , {
 method:"POST",
    headers:{
        "Content-type":"application/json",
    }, 
    body: JSON.stringify(payload),
    })
   
    const data = await response.json()
    return data
}

interface signUpDetails {
    userName: string,
    role:string,
    password:string,
    conformPassword:string
}

export async function signUpService(payload:signUpDetails) {
    const response = await fetch("/api/signup", {
        method:"POST",
        headers : {
            "content-type": "application/json",
        },
        body:JSON.stringify(payload)
    })
    const data = await response.json()
    return data;
}
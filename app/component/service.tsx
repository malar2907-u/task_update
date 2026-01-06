export const postMethodService = async ({ apiUrl,payload
 }) => {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return data;
};

// fetch url without params

export async function fetchDataWithoutParams({apiUrl}) {
    const getResponse = await fetch(apiUrl)
    const data = await getResponse.json()
    return data
}


// interface loginPayload {
//     userName: string,
//     password: string
// }

// export async function LoginService(payload: loginPayload) {
//     const response = await fetch("/api/login", {
//         method: "POST",
//         headers: {
//             "Content-type": "application/json",
//         },
//         body: JSON.stringify(payload),
//     })

//     const data = await response.json()
//     return data
// }

// interface signUpDetails {
//     userName: string,
//     role: string,
//     password: string,
//     conformPassword: string
// }

// export async function signUpService(payload: signUpDetails) {
//     const response = await fetch("/api/signup", {
//         method: "POST",
//         headers: {
//             "content-type": "application/json",
//         },
//         body: JSON.stringify(payload)
//     })
//     const data = await response.json()
//     return data;
// }

// export async function fetchRules() {
//     const getRules = await fetch("/api/roles")
//     const data = await getRules.json()
//     return data
// }
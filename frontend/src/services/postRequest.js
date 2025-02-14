export default async function postRequest(endPoint, data) {


    // console.log(data)
    const token  = localStorage.getItem('tokenData')

    const res = await fetch(endPoint, {
        method: 'POST',
        headers: {
            token: token,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const response = await res.json()

    // console.log('post request', response)

    return response
}
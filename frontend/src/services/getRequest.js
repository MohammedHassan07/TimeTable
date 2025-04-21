export default async function getRequest(endPoint) {


    const token  = localStorage.getItem('token')
    // console.log(data, token)

    const res = await fetch(endPoint, {
        method: 'GET',
        headers: {
            token: token,
            'Content-type': 'application/json'
        },
    })

    const response = await res.json()

    // console.log('get request', response)

    return response
}
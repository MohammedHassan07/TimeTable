export default async function postRequest(endPoint, data) {

    const token = localStorage.getItem('token')
    // console.log(data, token)

    const res = await fetch(endPoint, {
        method: 'POST',
        headers: {
            token: token,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const response = await res.json()
    // console.log(response)

    if (res.status !== 200) {
        return { flag: false, message: response.message }
    }

    return { response, flag: true }
}
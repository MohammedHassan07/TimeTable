export default async function uploadFile(endPoint, data) {

    const token = localStorage.getItem('token');

    const res = await fetch(endPoint, {
        method: 'POST',
        headers: {
            token: token,
        },
        body: data
    });

    const response = await res.json();

    // console.log(response)

    return response
}
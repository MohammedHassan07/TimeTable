export default function isEmpty(data) {


    // console.log(data)
    if (!data || Object.keys(data).length === 0) {
        return { flag: true, error: 'All fields are mandatory !!!' }
    }

    for (let key in data) {

        if (Object.prototype.hasOwnProperty.call(data, key)) {
            
            if (data[key] === undefined || data[key] === null || data[key].trim() === '') {

                return { flag: true, error: `All fields are Required !!!` }
            }
        }
    }
    return false
}

module.exports = function isEmpty(req, res, next) {

    const data = req.body
    // console.log(req.body)

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            status: 400,
            error: "Bad Request",
            message: "Required values are empty."
        })
    }

    for (let key in data) {

        if (Object.prototype.hasOwnProperty.call(data, key)) {

            if (key !== 'image') {

                if (data[key] === undefined || data[key] === null || data[key].trim() === '') {

                    return res.status(400).json({
                        status: 400,
                        error: "Bad Request",
                        message: `Required field '${key}' is empty.`
                    })
                }
            }
        }
    }

    next()
}

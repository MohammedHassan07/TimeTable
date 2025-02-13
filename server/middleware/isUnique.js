const userModel = require("../models/user.model")

module.exports = async function isUnique(req, res, next) {

    try {

        // console.log('unique -->', req.body)
        const { email } = req.body

        const data = await userModel.findOne({ email })

        // console.log('unique -->', data)

        if (data) {
            return res.status(409).json({
                status: 409,
                error: 'Conflict',
                message: 'A user with the provided details already exists.',
            })
        }

        next()
    } catch (error) {
        console.error('Error in isUnique Middleware:', error)
        res.status(500).json({
            status: 500,
            error: 'Internal Server Error',
            message: 'An error occurred while attempting to validate uniqueness. Please try again later.',
        })
    }
}


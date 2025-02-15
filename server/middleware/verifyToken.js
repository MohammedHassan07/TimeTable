const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

function verify_jwt_token(req, res, next) {

    try {

        const user_token = req.headers.token
        // console.log('verify token -->', user_token)

        if (!user_token) {

            res.status(401).json({
                status: 401,
                error: "Unauthorized",
                message: "Authorization token is missing. Please provide a valid token to access this resource."
            })
            return
        }

        const verified_token = jwt.verify(user_token, process.env.JWT_SECRET_KEY)
        // console.log(verified_token)

        if (!verified_token) {

            res.status(402).json({
                "status": 401,
                "error": "Unauthorized",
                "message": "Invalid credentials. Please check your username and password and try again."
            })
            return
        }

        req.id = verified_token.user_id
        // console.log('verify token -->', verified_token)
        next()

    } catch (error) {
        console.log(error)
        res.status(500).json({ flag: false, message: 'Internal Server Error' })
    }
}


const adminMiddleware = async (req, res, next) => {

    const user = await userModel.findOne({ _id: req.id })

    // console.log(user, req.id)

    if (user.role !== 'Admin') return res.status(403).json({ message: 'Access denied, admin only' })
    next()
}
module.exports = { verify_jwt_token, adminMiddleware }
const userModel = require('../models/user.model')
const { generate_password, compare_password } = require('../utils/hash')
const { generate_token } = require('../utils/token')

// Create user profile
const create_user_profile = async (req, res) => {
    try {

        const {
            name, email, password, role, department
        } = req.body

        // console.log('create-profile -->', req.body)

        // hash password
        const hashPass = await generate_password(password)

        const user_data = new userModel({
            name, email, password:hashPass, role, department
        })

        const saved_data = await user_data.save()
        res.status(201).json({
            "status": 201,
            "message": "User registered successfully."
        })

    } catch (error) {

        console.log('crearte profile --> ', error)
        res.status(500).json({
            "status": 500,
            "error": "Internal Server Error",
            "message": "An error occurred while attempting to save the data. Please try again later."
        })
        return
    }
}

// User Login
const user_login = async (req, res) => {

    try {

        const {
            email,
            password } = req.body

        // console.log('logIn --> ', req.body)

        const user_data = await userModel.findOne({ email })
        if (!user_data) {

            return res.status(404).json({
                "status": 404,
                "error": "Not Found",
                "message": "The requested data was not found."
            })
        }

        console.log('login --> ', user_data)

        // check password
        const verified = await compare_password(password, user_data.password)
        if (!verified) {

            res.status(401).json({
                "status": 401,
                "error": "Unauthorized",
                "message": "Invalid credentials. Please check your username and password and try again."
            })
            return
        }

        // generate token
        const token = await generate_token(user_data._id)
        if (!token) {

            res.status(500).json({
                "status": 500,
                "error": "Internal Server Error",
                "message": "An error occurred while attempting to save the data. Please try again later."
            })
            return
        }
        res.status(200).json({
            "status": 200,
            "message": "Login successful.",
            "data": {
                email,
                token
            }
        })

    } catch (error) {

        console.log('login --> ', error)
        res.status(500).json({
            "status": 500,
            "error": "Internal Server Error",
            "message": "An error occurred while attempting to save the data. Please try again later."
        })
    }
}

module.exports = {
    create_user_profile,
    user_login
}
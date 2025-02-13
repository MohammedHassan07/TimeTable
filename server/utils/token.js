const jwt = require('jsonwebtoken')

async function generate_token(id) {

    try {
        
        // console.log('token --> ', process.env.JWT_SECRET_KEY, id)
        
        const user_id = { user_id: id }
        const token = jwt.sign(user_id, process.env.JWT_SECRET_KEY)
        return token

    } catch (error) {

        console.log('generate token --> ', error)
        return null
    }
}

module.exports = { generate_token }
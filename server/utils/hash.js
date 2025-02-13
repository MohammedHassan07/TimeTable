const bcryptjs = require('bcryptjs')

async function generate_password(userPassword) {

    try {

        // console.log(userPassword)
        const hashSalt = bcryptjs.genSaltSync(10); // retreive it from .env 
        const hashPassword = await bcryptjs.hash(userPassword, hashSalt)

        if (!hashPassword) {

            return {
                "status": 500,
                "error": "Internal Server Error",
                "message": "An error occurred while attempting to save the data. Please try again later."
            }
        }

        return hashPassword
    } catch (error) {

        console.log('genreate password --> ', error)
        return {
            "status": 500,
            "error": "Internal Server Error",
            "message": "An error occurred while attempting to save the data. Please try again later."
        }
    }
}

async function compare_password(userPassword, hashPassword) {

    const validPassword = await bcryptjs.compare(userPassword, hashPassword)
    return validPassword ? true : false
}

module.exports = {

    generate_password, compare_password
}
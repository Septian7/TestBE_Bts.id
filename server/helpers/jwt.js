const jwt = require('jsonwebtoken')
const secretCode = process.env.SECRET_CODE;

const tokenGenerator = (user) =>{
    const {username,email,password,phone,address,city,country,name,postcode} =user
    let token = jwt.sign({
        username,email,phone,address,city,country,name,postcode
    },secretCode)
    return token
}

const tokenVerifier = token =>{
    let decoded = jwt.verify(token,secretCode)
    return decoded
}

module.exports = {
    tokenGenerator,
    tokenVerifier
}
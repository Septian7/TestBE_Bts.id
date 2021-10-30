const bcrypt = require('bcrypt')
const saltRound = +process.env.SALT_ROUND;

const encrypt = (pwd) => {
    return bcrypt.hashSync(pwd,saltRound)
}

const decrypt = (pwd,hashPwd) => {
    return bcrypt.compareSync(pwd,hashPwd)
}

module.exports = {
    encrypt, decrypt
}
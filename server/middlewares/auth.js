const {tokenVerifier} = require('../helpers/jwt')

function authen(req,res,next){
    let reqtoken = req.headers.authorization;
    // console.log(req)
    // console.log(req.headers.authorization)
    let token = reqtoken.substring(7, reqtoken.length+1)
    // console.log(token)
    if(token){
        try{
            const decoded = tokenVerifier(token)
            // console.log(decoded)
            req.UserData = decoded
            next()
        }catch(err){
            res.status(401).json({
                message:'User data is not authenticated'
            })
        }
    }else{
        res.status(404).json({
            message:"Token not found!"
        })
    }
}

module.exports = {
    authen
}
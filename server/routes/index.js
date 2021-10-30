const router = require('express').Router();

router.get('/',(req,res)=>{
    res.status(200).json('Home')
})

const apiRoute = require('./api')

router.use('/api',apiRoute)

module.exports = router
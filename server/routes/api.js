const apiRoute = require('express').Router()
const apiController = require('../controllers/apiController.js')
const { authen } = require("../middlewares/auth");

apiRoute.post('/users/signup', apiController.signup)
apiRoute.post('/users/signin', apiController.signin)
apiRoute.get('/users',authen,apiController.showUser)
apiRoute.post('/shopping', apiController.createShopping)
apiRoute.get('/shopping',authen, apiController.showShopping)
apiRoute.get('/shopping/:id',authen, apiController.shoppingByid)
apiRoute.put('/shopping/:id',authen, apiController.updateShopping)
apiRoute.delete('/shopping/:id',authen, apiController.deleteShopping)


module.exports = apiRoute
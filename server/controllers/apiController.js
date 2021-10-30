const {User,Shopping} = require('../models')
const { tokenGenerator } = require('../helpers/jwt');
const {encrypt,decrypt} =require('../helpers/endec')

class apiController{
    static async showUser(req,res){
        try{
            let users = await User.findAll()
            res.status(200).json({users})

        }catch(err){
            res.status(500).json(err)
        }
    }

    static async signup(req,res){
        try{
            const{username,email,encrypted_password,phone,address,city,country,name,postcode} = req.body.user
            const password = encrypt(encrypted_password)
            let users = await User.create({
                username,password,email,phone,country,city,postcode,name,address
            })
            let token = tokenGenerator(users)
            res.status(200).json({email,token,username})

        }catch(err){
            res.status(500).json(err)
        }
    }

    static async signin(req,res){
        try{
            const{email,password} = req.body
            let users = await User.findOne({
                where:{email:email}
            })
            let token = tokenGenerator(users)
            const username= users.username
            if(users){
                if(decrypt(password,users.password)){
                    res.status(200).json({email,token,username})
                }else{
                    res.status(403).json({
                        message:"password is Invalid!"
                    })
                }
            }else{
                res.status(404).json({
                    message:"user not found!"
                })
            }

        }catch(err){
            res.status(500).json(err)
        }
    }

    static async createShopping(req,res){
        try{
            const {createdate,name}=req.body.shopping

            let shop = await Shopping.create({
                Name:name,CreateDate:createdate
            })
            let id = shop.id

            res.status(200).json({data:{createdate,id,name}})

        }catch(err){
            res.status(500).json(err)
        }
    }

    static async showShopping(req,res){
        try{
            let shop = await Shopping.findAll()
            res.status(200).json({shop})

        }catch(err){
            res.status(500).json(err)
        }
    }

    static async shoppingByid(req,res){
        try{
            let id = +req.params.id
            let shop = await Shopping.findByPk(id)
            res.status(200).json({shop})

        }catch(err){
            res.status(500).json(err)
        }
    }

    static async updateShopping(req,res){
        try{
            let id = +req.params.id
            const {createdate,name}=req.body.shopping

            let shop = await Shopping.update({
                Name:name,CreateDate:createdate
            },{
                where:{id}
            })
            console.log(shop)
            shop[0]===1? res.status(200).json({message:"data has been update!"})
            :res.status(400).json({message:`id ${id} not found!`})
            res.status(200).json({shop})

        }catch(err){
            res.status(500).json(err)
        }
    }

    static async deleteShopping(req,res){
        try{
            let id = +req.params.id
            let shop = await Shopping.destroy({
                where:{id}
            })

             shop === 1 ? res.status(200).json({
                message:`id ${id} has been delete`
            }):
            res.status(404).json({
                message:"id not found!"
            })

        }catch(err){
            res.status(500).json(err)
        }
    }

}

module.exports = apiController
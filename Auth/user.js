import express from 'express'
import bcrypt from 'bcrypt'
import { createEntity, loginVerify } from '../DB/db.utils.js'
import jwt from 'jsonwebtoken'


const authrouter = express.Router()


authrouter.get('/health',(req,res) => {
    res.send('backend is running')
})


authrouter.post('/register',async(req,res) => {
    const userobj = req.body;
    await bcrypt.hash(userobj.password,10,async(err,hash) => {
        userobj.password = hash,
        await createEntity('users',userobj)
    })
 res.send('user created succesfully')

 })


 authrouter.post('/login',async(req,res) =>{
    const loginobj = req.body

   const verObj =  await loginVerify('users',loginobj.email)
   await bcrypt.compare(loginobj.password,verObj.password,async function(err,result) {
    console.log(result)
    let usertoken = null
    if(result){
       await jwt.sign({...verObj},process.env.TOKEN_SECRET,{expiresIn:'1d'},function(err,token)  {
            console.log(token)
            usertoken = token
        })
        delete verObj.password
        res.send({
            accesstoken:usertoken,
            ...verObj,
            msg:'Login successfull'})
    }
    else{
        res.send({msg:'invalid credentials'})
    }
   })
   console.log(verObj)
 })


export {authrouter}
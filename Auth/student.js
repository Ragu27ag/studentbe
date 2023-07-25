import express from 'express'
import { createEntity, readAllEntity, readAllQuery, readOneEntity, updateEntity } from '../DB/db.utils.js';
import { checkToken } from '../middlewares/auth-chk.js';
import jwt from 'jsonwebtoken'


const studentRouter = express.Router()


studentRouter.get('/',checkToken,async(req,res) =>{
    const {teacher} = req.query
    if(teacher){
        res.send(await readAllQuery('student',teacher))
    }
    else{
        res.send(await readAllEntity('student'))

    }
})

studentRouter.get('/:studentid',checkToken,async(req,res) =>{
    const stuid = req.params
    console.log(stuid)
   const data =  await readOneEntity('student',stuid.studentid)
   console.log(data)
   res.send(data)
})

studentRouter.put('/:studentid',checkToken,async(req,res) => {
    const studentid = req.params
    const stubody = req.body
    console.log(studentid)
    console.log(stubody)
    delete stubody._id
    await updateEntity('student',stubody,studentid.studentid)
    res.send({'msg' : 'updated succesfully'})
})


studentRouter.delete('/:studentid',checkToken,async(req,res) =>{
    const stuid = req.params
    res.send(await deleteEntity('student',stuid))
})

studentRouter.post('/',checkToken,async(req,res) => {
    const stuObj = req.body;


    jwt.verify(req.headers['accesstoken'],process.env.TOKEN_SECRET,async(err,decoded) => {
        if(err){
            return
        }

        const newData = {...stuObj, 'teacher': decoded.email}
        await createEntity('student',newData)
        res.send({'msg' :'created successfully'})


    })

})

export default studentRouter
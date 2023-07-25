import { ObjectId } from "mongodb";
import client from "./db-client.js";



const createEntity =async (name,userobj) => {
    await client.db('SchoolManagement').collection(name).insertOne(userobj)
}

const loginVerify = async(name,email) => {
 return   await client.db('SchoolManagement').collection(name).findOne({'email':email})
}



const readAllQuery = async(name,objname) => {
    return   await client.db('SchoolManagement').collection(name).find({'teacher':objname}).toArray()
   }

const readAllEntity = async(name,objname) => {
 return   await client.db('SchoolManagement').collection(name).find({}).toArray()
}

const readOneEntity = async(name,id) => {
   return await client.db('SchoolManagement').collection(name).findOne({_id : new ObjectId(id)})
}

const updateEntity = async (name,stubody,id ) => {
    await client.db('SchoolManagement').collection(name).updateOne({_id : new ObjectId(id)},{'$set':stubody})
}

const deleteEntity = async (name,id ) => {
    await client.db('SchoolManagement').collection(name).deleteOne({_id : new ObjectId(id)})
}


export {createEntity,loginVerify,readAllEntity,readOneEntity,updateEntity,deleteEntity,readAllQuery}
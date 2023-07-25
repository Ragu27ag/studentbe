import express from 'express'
import cors from 'cors'
import { authrouter } from './Auth/user.js';
import client from './DB/db-client.js';
import dotenv from 'dotenv'
import studentRouter from './Auth/student.js';


const app = express();
app.use(express.json());
app.use(cors());
client.connect();
dotenv.config()

app.use('/auth',authrouter)
app.use('/students',studentRouter)




app.listen('5000',() => {
    console.log('http://localhost/5000')
})
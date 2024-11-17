import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
const app = express();


app.use(cors({
    origin: `${process.env.CORS_ORIGIN}`,
    credentials: true, 
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

app.use(cookieParser());


// routes 


import routes from './routes/user.routes.js'; 

app.use('/api/v1/users',routes)









export {app}
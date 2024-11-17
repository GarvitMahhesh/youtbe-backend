import { asynhandle } from "../utilities/asyncHANDLER.js";
import CustomError from '../utilities/error.js';   
import { User } from '../models/User.model.js'; 
import {uploadOnCloudinary} from '../utilities/cloudinary.js';
import {apiresponse} from '../utilities/response.js';



const register = asynhandle(async (req,res) => {
         const {fullname,email,username ,password } = req.body;
 if ( 
    [fullname,email,username ,password ].some((filed)=>
      filed?.trim() === "")
    ){
        throw new CustomError(400,"ALL ARE REQUEIRED")
        
    }
        const existedUser= User.findone({
            $or:[{
                 username
            },{
                email
            }]
           })

           if(existedUser) {
            throw new CustomError(409,"user already exists")
           }

    const localpath = req.files?.AVTAR[0]?.path;
    const localcoverimg = req.files?.COVER_IMAGE[0]?.path;

    if(!localpath){
        throw new CustomError(400,"AVATAR IS REQUIRED")
    }

    const avatar = await uploadOnCloudinary(localpath)
    const coverimg = await uploadOnCloudinary(localcoverimg)
    if(!avatar){
        throw new CustomError(400,"AVATAR IS REQUIRED")
    }

     const user =  await User.create({
        fullname,
        avatar:avatar.url,
        coverimage :coverimg?.url || "",
        email,
        username: username.tolowercase(),
        password,
        

     })     

    const CREATEUSER = await  user.findByid(user._id).select("-password -refreshToken")
     
    if(!CREATEUSER){
        throw new CustomError(500,"internal server error")
    }
       return res.status(201).json(
        new apiresponse(200,CREATEUSER, "usercreated")
       )
})




export { register}
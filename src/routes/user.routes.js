import { Router } from "express";
 import {register} from "../controlfun/user.controller.js";
 import {upload} from "../middleware/multer.middleware.js";


 const routes =Router()
 routes.route('/register').post(
    upload.fields([
        {
         name:"AVTAR",
         maxcount:1

        },
        {
            name:"COVER_IMAGE",
            maxcount:1
        }
        ]),
        register
    )
    
    
 



 export default routes
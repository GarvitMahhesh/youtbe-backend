const asynhandle = (reqhandle) =>{
    (req,res,next) =>{
        Promise.resolve(reqhandle(req,res,next))
        .catch((err)=>  next(err)
       )
    }
}
export {asynhandle}
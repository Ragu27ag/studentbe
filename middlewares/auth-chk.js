


const checkToken = (req,res,next ) => {
    if(req.headers['accesstoken'] === undefined){
        res.status(404).send('user not authorized')
        return
    }
    next()
}

export {checkToken}
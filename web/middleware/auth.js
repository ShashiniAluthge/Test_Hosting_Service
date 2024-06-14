var jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = function(req,res,next){
const token = req.headers["access_token"]

if(!token){
    return res.json("no token")
}else{
    jwt.verify(token,process.env.TOKEN,(err,user)=>{
        if(err){
            return res.json("not authenticate") 
        }else{
            next()
        }
    })
}





    // if(req.headers.authorization && req.headers.authorization.startsWith('bearer')){
    //     const token = req.headers.authorization.split(' ')[1];
    //     if(token==null) res.sendStatus(401)
    //         jwt.verify(token,process.env.TOKEN,(err,user)=>{
    //     if(err) res.sendStatus(403)
    //         req.user = user;
    //         next();
    //     })
    // }else{
    //     res.sendStatus(401)
    // }
}
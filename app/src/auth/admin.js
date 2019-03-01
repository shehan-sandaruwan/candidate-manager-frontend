const admin = (req,res,next) =>{
    if(req.authUser.isAdmin){
        next();
    }
    else{
        res.writeHead(403);
        res.end();
    }
}
module.exports = admin;
const superAdmin = (req,res,next) =>{
    if(req.authUser.isSuperAdmin){
        next();
    }
    else{
        res.writeHead(403);
        res.end();
    }
}
module.exports = superAdmin;
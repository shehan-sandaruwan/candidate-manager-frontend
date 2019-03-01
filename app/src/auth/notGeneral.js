const notGeneral = (req,res,next) =>{
    if(req.authUser.isAdmin || req.authUser.isSuperAdmin || req.authUser.canShortList || req.authUser.canInterview){
        next();
    }
    else{
        res.writeHead(403);
        res.end();
    }
}
module.exports = notGeneral;
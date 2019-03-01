const canShortList = (req,res,next) =>{
    if(req.authUser.canShortList){
        next();
    }
    else{
        res.writeHead(403);
        res.end();
    }
}
module.exports =canShortList;
const canInterview = (req,res,next) =>{
    if(req.authUser.canInterview){
        next();
    }
    else{
        res.writeHead(403);
        res.end();
    }
}
module.exports =canInterview;
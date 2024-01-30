const jwt = require("jsonwebtoken");
const JWT_SECRET = "Suryraj@9506";

const fetchuser = (req,res,next) => {
    const token=req.header('auth-token');
    if(!token)
    {
        return res.status(401).json({error:"Please try again after login !"});
    }
    try{
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    }
    catch(error){
        res.status(500).json({ error: "Internal server error !" });
    }
};
module.exports = fetchuser;


const sessionLogin = async (req,res)=>{
   res.send(req.user)
}

const loginRegister = async (req,res)=>{
    res.send(req.user) 
}  


module.exports={
    sessionLogin,
    loginRegister,
    
}
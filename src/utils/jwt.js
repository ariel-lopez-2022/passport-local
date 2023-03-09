const jwt = require('jsonwebtoken');
const { PRIVATE_KEY_JWT } = require('./constants');


const generateToken = (payload) => {
    console.log(payload);
    const token = jwt.sign({payload}, PRIVATE_KEY_JWT, {expiresIn:'10m'});
    return token;
}



const regenerateToken = (req,res,next) => {
    const headerAuth = req.headers.Authorization;
    if (!headerAuth) {
        res.status(401).sed({error:'token inexistente'})
    }
  const token = headerAuth.split(' ')[1];
  if(token) {
     jwt.decode(token, PRIVATE_KEY_JWT, (error, credential)=>{
         if (error){
            res.status(500).send({error:'error inesperado',error});
         }else{
            req.payload = credential.payload
         }
         next();
     })
  } else{
    res.status(401).send({error:'no se encontro token'});
        
  }  
}



module.exports ={
    generateToken,
    regenerateToken
}
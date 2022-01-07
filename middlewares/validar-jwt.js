const{response}=require('express')

const jwt=require('jsonwebtoken')

const validarJWT=(req,res=response ,next)=>{

    //XTOKEN

    const token=req.header('x-token')
   if(!token){
       return res.status(401).json({
           ok:false,
           msg:'no ahi token en la peticion'
       })
   }
   try {
       const {uid,name}=jwt.verify(
           token,
           process.env.SECRET_JWT_SEED
       );

       //console.log(payload)
       req.uid=uid;
       req.name=name
       
   } catch (error) {
       return response.status(401).json({
           ok:false,
           msg:'Token no valido'
       })
   }
    next();

}

module.exports={
    validarJWT
}
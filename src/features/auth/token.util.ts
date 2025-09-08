
import jwt from "jsonwebtoken"

function generateToken(id:number, email:string, isAdmin:boolean){
return jwt.sign({id:id, email:email, isAdmin:isAdmin },process.env.JWT_SECRET_KEY as string)
}

export default generateToken;
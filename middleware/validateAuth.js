const jwt = require("jsonwebtoken")
const Users = require("../model/authModel")

const validateToken  = async(request, response, next)=>{
try {
    const tk = request.header("Authorization")
    if(!tk){
        return response.status(401).json({message:"Access Denied!"})
    }

const tkk = tk.split(" ")

const token = tkk[1]

const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
if(!decoded){ return response.status(401).json({message: "Invalid Login Details"})
}

    //second search
const user = await Users.findOne({_id: decoded.user._id})
if(!user){
    return response.status(404).json({message:"User account not found"})
}
//user.role == "user"
request.user = user

next()

console.log({user})
} catch (error) {
    return response.status(500).json({message: error.message})
    
}


}


module.exports = validateToken
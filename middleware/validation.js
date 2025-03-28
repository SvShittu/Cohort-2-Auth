const validateRegistration = async(request, response, next)=>{
    const{firstName, lastName, email, password} = request.body
    
const errors = []


if(!email){
    errors.push("Please add email")
}

if (password.length < 8){
    errors.push("Minimum of eight characters required for password.")
}

if(errors.length > 0){
    return response.status(400).json({message : errors})
}
next()
}

 
module.exports = {
    validateRegistration
}
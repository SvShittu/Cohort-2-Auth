

// validate Registration
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
//validate Login
const validateLogin = async(request, response, next) =>{
    const{ email, password, } = request.body
    const errors = []

    if(!email){
        errors.push("Please add your email")
    } else if(!validEmail(email)){
        errors.push("email format is incorrect")
    }

    if(!password){
        errors.push("Please add your Password")
    }

    if(errors.length > 0){
        return response.status(400).json({message: errors})
    }
    next()
}

// validate Email with RegEx
function validEmail(email){
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase());
}
 
module.exports = {
    validateRegistration,
    validateLogin 
} 
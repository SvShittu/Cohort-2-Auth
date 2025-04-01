const express = require("express")
const connectToDatabase = require("./db")
const Users = require("./model/authModel")
const dotenv = require("dotenv").config()
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const { validateRegistration, validateLogin } = require("./middleware/validation")
const jwt = require("jsonwebtoken")
const validateToken = require("./middleware/validateAuth")
const sendUserEmail  = require("./sendEmail")


const app = express() 

app.use(express.json())
const PORT = process.env.PORT || 8000

//Connect to DATABASE
connectToDatabase()

app.listen(PORT, () =>{
console.log(`Server running on ${PORT}`)

})


app.get("/", (request, response)=> {
  return response.status(200).json({message: "Welcome to youthrive Backend"})
})


app.post("/register",validateRegistration, async(request, response)=>{
const { userID, firstName, lastName, email, password } = request.body
  
// if(!email){

//   return response.status(400).json({message: "please add your email"})
// }

// if(password.length < 8){
//   return response.status(400).json({message: "password should be minimum of 8 characters."})
//}

const existingUser = await Users.findOne({email})

if(existingUser){
  return response.status(400).json({message: "User Account Already exist!"})
}
//Hash password
const hashedPassword = await bcrypt.hash(password, 12)

//Generate ID Name/date/number

const number = Math.floor(Math.random * 100)
const theId = `${lastName}/${new Date()}/${number}`


const newUser = new Users({firstName, lastName, email, password: hashedPassword })
await newUser.save()
// Send Users Email
await sendUserEmail(email)
 
return response.status(200).json({message: "Successful",
  user: newUser
})
})


app.get("/user/:id", async (request, response) =>{

  try {
     const{ id } = request.params

  const user = await Users.findById(id)

  return response.status(200).json({message : "Successful",
     user
      })
    
  } catch (error) {
    return response.status(500).json({
      message: error.message
    })
  }
  // const{ id } = request.params

  // const user = await Users.findById(id)

  // return response.status(200).json({message : "Successful",
  //    user
  //     })
})

  
app.post("/login", validateLogin, async(request, response)=>{

  try {
    // if(!request.user){

    //   return response.status(401).json({message: "Access Denied, Invalid Authentication"})    }
  
  
  //payload
    const { email, password } = request.body

  const user = await Users.findOne({email})

  if(!user){
    return response.status(404).json({message:"user account not found"})
  }
const  isMatched = bcrypt.compare(user.password, password)

  if(!isMatched){
    return response.status(400).json({message: "Incorrect password or email"})
  }
// Generating Tokens
//Access Token
 
const OTP =Math.floor( Math.random() * 100)
const accessToken = jwt.sign({user},`${process.env.ACCESS_TOKEN}`,{expiresIn:"30m"})
const refreshToken = jwt.sign({user},`${process.env.REFRESH_TOKEN}`,{expiresIn:"30m"})

await sendUserEmail(email)
 return response.status(200).json({message : "Login Successful", accessToken, refreshToken, OTP })


 return response.status(200).json({
  message: "Login Successful",
  accessToken, 
  user
 }) 
 

  } catch (error) {
    return response.status(500).json({message : error.message})
  }
 })

 // Protected Routes
app.post("/auth", validateToken, (request, response)=>{

  return response.status(200).json({message: "Successful", user: "request.user" })
})

app.post("/fund", validateToken)

app.get("/acct-balance", validateToken) 

const fetch = async()=>{
 const response = await axios.post("url/endpoint",
{email, password},
{header: {
  Authorization:`Bearer ACCESS_TOKEN`,
} }

 )
 return response.status
}
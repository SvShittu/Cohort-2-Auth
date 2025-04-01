const nodemailer = require("nodemailer")


//infoe@youthrive.com
//Zoho, Sendgrid, gsuite, microsoft360
const sendUserEmail = async(userEmail)=>{

try {
    //Login Details
const mailTransporter = nodemailer.createTransport({

    service: "gmail",
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})
    


//Details to send
const detailsToSend = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "YOUR LOGIN DETAILS",
    html: `<div>
    <h1>Hello, user</h1>
    <h1>Password: hfhhfgfhhfhfhf</h1>
    <h1>Email: ${userEmail}</h1>
    <h1>Thanks</h1>
    </div>`,
}
const result = await mailTransporter.sendMail(detailsToSend)

// send
} catch (error) {
    console.log(error)
} 
}

module.exports = sendUserEmail
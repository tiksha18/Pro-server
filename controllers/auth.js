//const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { SECRET_KEY, GMAIL_ID, GMAIL_PW } = "../config/secrets.js";
const User = require('../models/user.js');
const nodemailer = require("nodemailer");


async function signin(req, res) {
  
    try
    {
        let {email, password} = req.body;
        let loggedInUser = await User.find({ email : email });
        if(loggedInUser.length)
        {
            let user = loggedInUser[0];
            //const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if(user.password == password)
            {
                // yaha JWT Token banega
                const token = jwt.sign( { id : user["_id"]} , "jadhbsyudbjhsbdygasoaijajbkjbfiufnjknf" );  // yaha me token me payload me wo id jayegi user ko jo mongodb khud se banadeta h and secret key humne config folder me di h
                // make a cookie taki user agar uss duration k beech me wapas aata h same site pe to wo login show ho
                res.cookie('jwt', token, {httpOnly: true});                
                res.status(200).json({
                    "message" : "Logged in Successfully",
                    "data" : loggedInUser[0]
                })
            }
            else
            {
                res.status(200).json({
                    "message" : "Email id and Password didn't match"
                })
            }
        }
        else
        {
            res.status(200).json({
                "message" : "No User Found ! SignUp First !"
            })
        }
    }
    catch(error)
    {
        res.status(501).json({
            "message" : "Failed to Log in",
            "error" : error
        })
    }

}

async function sendEmail(message)
{
    try
    {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
                user: "test.mail.120092@gmail.com",
                pass : "iyqsmvmdbdbipigp"
            }
        });

        await transporter.sendMail({
            from: message.from, // sender address
            to: message.to, // list of receivers
            subject: message.subject, // Subject line
            text: message.text, // plain text body
        });
    }
    catch(error)
    {
        return error;
    }
}

async function signup(req, res) {
  
    try 
    {
        let user = req.body;
        let randomNumber = Math.floor(100000 + Math.random() * 900000);
        //const hashedPassword = await bcrypt.hash(user.password, 12);
        let newUser = await User.create({
            name : user.name,
            email : user.email,
            password : user.password,
            employeeId : randomNumber
        })
        
        let message = {
            from: "test.mail.120092@gmail.com", // sender address
            to: "test.mail.120092@gmail.com", // list of receivers // ( in run time => use email )
            subject: "Employee ID", // Subject line
            text: String(randomNumber), // plain text body
        }
        await sendEmail(message);
        console.log("Email Sent !");
        res.status(201).json({
            "message" : "Successfully Signed Up! Check your email to get your Employee ID",
            "data" : newUser,
            //employeeId
        })
    } 
    catch(error)
    {
        res.status(501).json({
            "message" : "Failed to Sign Up",
            "error" : "Email or Password entered is already in use !"
        })
    }
}

async function verify(req, res) 
{
    try 
    {
        let { employeeId, email } = req.body;
        
        let userValid = await User.find({ email : email});
        
        if(userValid.length)
        {
            let user = userValid[0];
            
            if(user.employeeId == employeeId)
            {
                res.status(200).json({
                    "message" : "Verified User"
                })
            }
            else
            {
                res.status(200).json({
                    "message" : "Employee Id entered is wrong"
                })
            }
        }
        else
        {
            res.status(200).json({
                "message" : "No such user exists"
            })
        }

    }
    catch(error)
    {
        res.status(200).json({
            "message" : "Employee Id entered is wrong"
        })
    }
}


module.exports.signin = signin;
module.exports.signup = signup;
module.exports.verify = verify;
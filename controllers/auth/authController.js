import { createUser, checkEmail } from '../../models/auth/authModel.js'
import AuthModel from '../../models/auth/authSchema.js'
/**
 * User Signin
 */
export const signin = (req, res) =>{
    res.send("In The SignIN Page");
    
}


/**
 * User Signup
 */
export const signup = (req, res) =>{
    
    const {name, email, phone, work, password, cpassword} = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"Plz Filled the fields properly"});
    }

    if(password !== cpassword){
        return res.status(422).json({error:"Your Confirm Password does not match with Password"});
    }

    checkEmail().then((emailExist) => {

        if(emailExist){
            return res.status(422).json({error:"Email Exist! Please Select a New One"});
        }

    })

    createUser({name, email, phone, work, password})
    .then((result) => {

        res.status(201).json({
            message:"User Registered Successfuly.",
            data:result
        });

    })
    .catch((error) =>{
        console.log(error);
        res.status(500).json({
            message:"User Registration Failed!",
            error:error.message
        });
    });

}
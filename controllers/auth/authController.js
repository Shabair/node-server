import UserModel from '../../models/authSchema.js'
import bcrypt from 'bcrypt'

/**
 * User Signin
 */
export const signin = async (req, res) => {
    var passwordCheck = '';

    try {
        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(422).json({ error: `Please Enter Username or Password.` })

        }

        const user = await UserModel.findOne({ email });
        if(user)
            passwordCheck = bcrypt.compareSync(password, user.password)

        if (!user || !passwordCheck) {
            return res.status(422).json({ error: `User Email Or Password Does not exist` })
        }

        const token = await user.generateAuthToken();

        res.cookie("jwt_token",token,{
            expires: new Date(Date.now() + 25892000000),
            httpOnly:true
        });
        res.send(`Toke: ${token}`);

    } catch (error) {

        res.status(500).json({

            error: `"User Registration Failed!" with this error: ${error.message}`

        });

    }

}

/**
 * User Signup
 */
export const signup = async (req, res) => {
    try {
        const { name, email, phone, work, password, cpassword } = req.body;

        if (!name || !email || !phone || !work || !password || !cpassword) {
            return res.status(422).json({ error: "Plz Filled the fields properly" });
        }

        const emailExist = await UserModel.findOne({ email: email });

        if (emailExist) {
            return res.status(422).json({ error: "Email Exist! Please Select a New One" });
        }else if(password !== cpassword){
            return res.status(422).json({ error: "Your Confirm Password does not match with Password" });
        }

        const user = new UserModel({ name, email, phone, work, password });

        const newUser = await user.save();

        if (newUser) {
            return res.status(201).json({
                message: "User Registered Successfuly.",
                data: newUser
            });
        }


    } catch (error) {

        res.status(500).json({
            error: `"User Registration Failed!" with this error: ${error.message}`
        });

    }

}
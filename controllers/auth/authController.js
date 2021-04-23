import UserModel from '../../models/authSchema.js'


/**
 * User Signin
 */
export const signin = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            
            return res.status(422).json({error: `Please Enter Username or Password.`})

        }

        const user = await UserModel.findOne({email,password});

        console.log(user);
    
        if(!user){
            return res.status(422).json({error: `User Email Or Password Does not exist`})
        }
        
        res.send(user);

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

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Plz Filled the fields properly" });
    }

    if (password !== cpassword) {
        return res.status(422).json({ error: "Your Confirm Password does not match with Password" });
    }

    try {
        const emailExist = await UserModel.findOne({ email: email });
        
        if (emailExist) {
            return res.status(422).json({ error: "Email Exist! Please Select a New One" });
        }

        const user = new UserModel({ name, email, phone, work, password });

        const newUser = await user.save();

        console.log(newUser)

        if(newUser){
            return res.status(201).json({
                message: "User Registered Successfuly.",
                data: newUser
            });
        }

        
    } catch{(error) => {

        res.status(500).json({
            error: `"User Registration Failed!" with this error: ${error.message}`
        });

    }}

}
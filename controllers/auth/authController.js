import { getAllPost } from '../../models/post/postModel.js'

/**
 * User Signin
 */
export const signin = (req, res) =>{
    res.send("In The SignIN Page");
    
}


/**
 * User Signup
 */
export const signup = () =>{
    res.send("In The SignUP Page");
}
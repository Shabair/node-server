import { getAllPost } from '../../models/post/postModel.js'

/**
 * Get All Posts
 */
export const getPosts = (req, res) =>{

    getAllPost().then((result) => {

        res.status(200).json(result);

    }).catch((error) =>{
        console.log(error);
        res.status(404).json({message:error.message});
    })
}


/**
 * Create Post
 */
export const createPost = () =>{

}


/**
 * User Signup2
 */
 export const signup2 = (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Plz Filled the fields properly" });
    }

    if (password !== cpassword) {
        return res.status(422).json({ error: "Your Confirm Password does not match with Password" });
    }


    checkEmail(email).then((emailExist) => {

        if (emailExist) {
            return res.status(422).json({ error: "Email Exist! Please Select a New One" });
        }

    })

    createUser({ name, email, phone, work, password })
        .then((result) => {

            res.status(201).json({
                message: "User Registered Successfuly.",
                data: result
            });

        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "User Registration Failed!",
                error: error.message
            });
        });

}


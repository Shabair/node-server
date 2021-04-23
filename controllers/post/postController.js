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

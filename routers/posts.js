import express from 'express'
import {getPosts, createPost} from '../controllers/post/postController.js'

const Router = express.Router();

/**
 * Get request at http:localhost:5000/posts
 */
Router.get('/',getPosts);

/**
 * post request at http:localhost:5000/posts
 */
Router.post('/',createPost);






export default Router;
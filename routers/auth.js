import express from 'express'
import {signin, signup} from '../controllers/auth/authController.js'

const Router = express.Router();

/**
 * Post request at http:localhost:5000/signin
 */
Router.post('/signin',signin);

/**
 * post request at http:localhost:5000/signup
 */
Router.post('/signup',signup);






export default Router;
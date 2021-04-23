import express from 'express'

const Router = express.Router();

/**
 * Middleware To Check the authentication
 */

const checkAuth = (req, res, next) => {
    console.log("In The check Auth Middleware Of About");

    next();
}

/**
 * Get request at http:localhost:5000/about
 */
Router.get('/',checkAuth,(req, res)=>{
    res.send('In The About Page');
});




export default Router;
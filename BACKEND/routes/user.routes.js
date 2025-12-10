 const express = require('express');
 const router = express.Router();
const { body} = require('express-validator');
const userController = require('../controllers/user.controler');
const authMiddleware = require('../middleware/auth.middleware');
router.post('/register', [
     body('email').isEmail().withMessage('Please enter a valid email'),
     body('fullname.firstname').isLength({min: 3}).withMessage(' firstname at least 6 characters long'),
    
     body('password').isLength({min: 6}).withMessage('Password must be at least 8 characters long'),
    
],
 userController.registerUser
);
router.post('/login', [
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    ],
    userController.loginUser
    );
router.get('/profile' ,authMiddleware.authUser, userController.getUserProfile);





router.get('/logout', authMiddleware.authUser, userController.logoutUser)
router.put('/update-profile', authMiddleware.authUser, userController.updateProfile)
 module.exports = router;
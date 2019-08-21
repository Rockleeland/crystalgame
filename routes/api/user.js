
const router = require('express').Router();
const userController = require('../../controllers/userController');
const exjwt = require('express-jwt');

const isAuthenticated = exjwt({
	secret: 'all sorts of code up in here',
});

// Any route with isAuthenticated is protected and you need a valid token to access
router
    .route('/user/:id', isAuthenticated)
    .get(userController.getUser);

router
    .route('/all-users')
    .get(userController.getAllUsers);

module.exports = router;


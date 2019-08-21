const router = require('express').Router();
const loginRoutes = require('./login');
const signUpRoutes = require('./signUp');
const userRoutes = require('./user');
const getCrystalRoutes = require('./crystal');
const cardsRoutes = require('./cards');
const isAuthenticated = require('./isAuthenticated');
const messagesRoutes = require('./messages');

router.use('/message', messagesRoutes);
router.use('/', isAuthenticated);
router.use('/login', loginRoutes);
router.use('/signup', signUpRoutes);
router.use('/user', userRoutes);
router.use('/getCrystal', getCrystalRoutes);
router.use('/cards', cardsRoutes);

module.exports = router;

const router = require('express').Router();

const cardsRoutes = require('./cards');
const getCrystalRoutes = require('./crystal');
const isAuthenticated = require('./isAuthenticated');
const loginRoutes = require('./login');
const messagesRoutes = require('./messages');
const signUpRoutes = require('./signUp');
const userRoutes = require('./user');

router.use('/', isAuthenticated);
router.use('/cards', cardsRoutes);
router.use('/getCrystal', getCrystalRoutes);
router.use('/login', loginRoutes);
router.use('/message', messagesRoutes);
router.use('/signup', signUpRoutes);
router.use('/user', userRoutes);

module.exports = router;

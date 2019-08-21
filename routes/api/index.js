const router = require("express").Router();
const loginRoutes = require("./login");
const signUpRoutes = require('./signUp');
const userRoutes = require('./user');
const getCrystalRoutes = require('./crystal');

router.use("/login", loginRoutes);
router.use("/signup", signUpRoutes);
router.use('/user', userRoutes);
router.use('/getCrystal', getCrystalRoutes)


module.exports = router;
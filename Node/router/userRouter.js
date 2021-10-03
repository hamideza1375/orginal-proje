const router = require('express').Router();
const Auth = require('../middleware/Auth');
const User = require('../controller/UserController');


router.post('/register', User.register);
router.post('/login', User.login);
router.get('/confirmpayment/:id', Auth, User.confirmPayment);
router.get('/verifypayment', User.verifyPayment);
router.post('/forgetpassword', User.forgetPassword);
router.post('/resetpassword/:id', User.resetPassword);
router.get("/captcha.png", User.captcha);



module.exports = router;

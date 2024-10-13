const express = require('express');
const { AuthenticationController } = require('../controllers');
const validate = require('../middlewares/validate');
const { createUser, loginUser,ContactDetails } = require('../validations/user.validation');
const verifiedJWT = require('../middlewares/verifiedToken');
const { upload } = require('../utils/uploads');


const router = express.Router();

router.route('/register').post(validate(createUser),AuthenticationController.register)
router.route('/login').post(validate(loginUser),AuthenticationController.login)
router.route('/profile').get(verifiedJWT,AuthenticationController.UserProfile)
router.route('/post').post(verifiedJWT,upload.single('image'),AuthenticationController.post);
router.route('/post').get(AuthenticationController.AllPosts);
router.route('/post/:id').get(AuthenticationController.SinglePost);

router.route('/contact').post(validate(ContactDetails),AuthenticationController.Contact);

// router.route('/post/:id').get(AuthenticationController.SinglePost);

module.exports = router;

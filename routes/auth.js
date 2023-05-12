const { Router } = require('express');
const { check } = require('express-validator');
const {validations} = require("../middlewares/validations");
const UserController = require("../controllers/UserController");
const { emailExists } = require("../helpers/Validators");
const {jwtValidations} = require("../middlewares/jwt-validations");

const router = Router();

router.post("/signup", [
  check('name', 'name is required').not().isEmpty(),
  check('email', 'email is required').isEmail(),
  check('password', 'password is required').not().isEmpty(),
  check('phonenumber', 'phonenumber is required').not().isEmpty(),
  check('password', 'the password is not strong enough').isLength({ min: 6 }),
  check('email').custom(emailExists),
  validations
], UserController.create);

router.get('/contacts', [
  jwtValidations,
  validations
], UserController.getContacts);

router.put('/contact', [
jwtValidations,
validations
], UserController.addContact);

router.post('/login', [
  check('email', 'need a email to proceed').isEmail(),
  check('password', 'password is required').not().isEmpty(),
  validations
], UserController.login);

module.exports = router;
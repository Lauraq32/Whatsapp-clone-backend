const { Router } = require('express');
const { check } = require('express-validator');
const {validations} = require("../middlewares/validations");
const MessageController = require("../controllers/MessageController");
const {jwtValidations} = require("../middlewares/jwt-validations");

const router = Router();

router.post("/send", [
  jwtValidations,
  check('message', 'message is required').not().isEmpty(),
  check('receiveto', 'receiveto is required').not().isEmpty(),
  validations
], MessageController.create);

router.get("/", [
  jwtValidations,
  validations
], MessageController.getMessages);

module.exports = router;
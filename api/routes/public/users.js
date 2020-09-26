const express = require("express");
const router = express.Router();
const usersController = require('../../controllers/users');

router.get('/',usersController.get_all);
router.get('/:_id',usersController.read_data);
  
module.exports = router;
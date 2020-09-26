const express = require("express");
const router = express.Router();
const usersController = require('../../controllers/users');

router.get('/',usersController.get_all);
router.get('/:_id',usersController.read_data);
router.post('/create',usersController.create_data);
router.put('/:_id',usersController.update_data);
router.delete('/:_id',usersController.delete_data);
  
module.exports = router;
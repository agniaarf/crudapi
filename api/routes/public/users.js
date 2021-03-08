const express = require("express");
const router = express.Router();
const usersController = require('../../controllers/users');

router.get('/',usersController.get_all);
router.post('/',usersController.create_data);
router.put('/:id',usersController.update_data);
router.delete('/:id',usersController.delete_data);
  
module.exports = router;
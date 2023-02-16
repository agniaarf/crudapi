const express = require("express");
const router = express.Router();
const kategoriControllers = require('../controllers/kategori');

router.get('/',kategoriControllers.get_all);
router.post('/',kategoriControllers.create_data);
router.put('/:id',kategoriControllers.update_data);
router.delete('/:id',kategoriControllers.delete_data);
  
module.exports = router;
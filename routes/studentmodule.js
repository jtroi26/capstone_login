var express = require('express');
const router = express.Router();
const studentmoduleController = require('../controller/studentmoduleController');

router.get('/studentmodule', studentmoduleController.getstudentmodule );
router.post('/studentmodule', studentmoduleController.poststudentmodule );

module.exports = router;

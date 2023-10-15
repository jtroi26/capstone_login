var express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

router.get('/student', studentController.getstudent );
router.post('/student', studentController.poststudent );

module.exports = router;

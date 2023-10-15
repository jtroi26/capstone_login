var express = require('express');
const router = express.Router();
const studentloginController = require('../controller/studentloginController');

router.get('/studentlogin', studentloginController.getstudentlogin );
router.post('/studentlogin', studentloginController.poststudentlogin );

module.exports = router;

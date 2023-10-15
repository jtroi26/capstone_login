var express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

router.get('/admin', adminController.getadmin );
router.post('/admin', adminController.postadmin );
router.post('/update-password', adminController.updatePassword);

module.exports = router;

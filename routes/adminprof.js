var express = require('express');
const router = express.Router();
const adminprofController = require('../controller/adminprofController');

router.get('/adminprof', adminprofController.getadminprof );
router.post('/adminprof', adminprofController.postadminprof );

module.exports = router;

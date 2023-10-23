var express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

router.get('/admin', adminController.getadmin );
router.post('/admin', adminController.postadmin );
router.post('/update-password', adminController.updatePassword);
router.post('/student_update-password', adminController.student_updatePassword);
router.get('/profaccounts', adminController.getprofaccount);
router.post('profaccounts', adminController.postprofaccount);
router.get('/profaccounts/view/:id', adminController.viewprofaccount);
router.get('/profaccounts/edit/:id', adminController.editprofaccount);
router.post('/profaccounts/edit/:id', adminController.updateprofaccount);
router.post('/profaccounts/delete/:id', adminController.deleteprofaccount);


module.exports = router;

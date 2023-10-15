var express = require('express');
const router = express.Router();
const logoutController = require('../controller/logoutController');

router.get('/logout', logoutController.getlogout );
router.post('/logout', logoutController.postlogout );

module.exports = router;

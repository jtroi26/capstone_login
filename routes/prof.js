var express = require('express');
const router = express.Router();
const profController = require('../controller/profController');

router.get('/prof', profController.getprof );
router.post('/prof', profController.postprof );

module.exports = router;

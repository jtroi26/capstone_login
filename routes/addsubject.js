var express = require('express');
const router = express.Router();
const addsubjectController = require('../controller/addsubjectController');

router.get('/addsubject', addsubjectController.getaddsubject );
router.post('/addsubject', addsubjectController.postaddsubject );

module.exports = router;

var express = require('express');
const router = express.Router();
const addprof_to_subjectController = require('../controller/addprof_to_subjectController');

router.get('/addprof_to_subject', addprof_to_subjectController.getaddprof_to_subject );
router.post('/addprof_to_subject', addprof_to_subjectController.postaddprof_to_subject );

module.exports = router;

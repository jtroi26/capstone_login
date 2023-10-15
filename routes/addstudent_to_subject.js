var express = require('express');
const router = express.Router();
const addstudent_to_subjectController = require('../controller/addstudent_to_subjectController');

router.get('/addstudent_to_subject', addstudent_to_subjectController.getaddstudent_to_subject );
router.post('/addstudent_to_subject', addstudent_to_subjectController.postaddstudent_to_subject );

module.exports = router;

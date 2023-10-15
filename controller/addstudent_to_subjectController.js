const mysql = require('mysql');
var express = require('express');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'capstone'
});

exports.getaddstudent_to_subject = async (req, res) => {

    const query = 'SELECT subject_id FROM subject';

    connection.query(query, (error, results) => {
        if (error) throw error;
        
        console.log(results);
        // Extract subject_ID values from the results
        const subjects = results.map(result => result.subject_id);
        
        // Render the student page with subjects data
        res.render('addstudent_to_subject', { subjects });
    });

    }
exports.postaddstudent_to_subject = async (req, res) => {

    const {subject_id, student_id, } = req.body;

    const query = `INSERT INTO assignstudent (subject_id, student_id) VALUES (?, ?)`;
    connection.query(query, [subject_id, student_id], (err, result) => {

        if (req != null){
            if (err) {
                console.error(err);
                console.log(result);
                res.render('addstudent_to_subject');
            } else {
                res.render('admin');
            }
        };

    });
        }
const mysql = require('mysql');
var express = require('express');

// Create a MySQL connection pool for better performance
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'capstone'
});

exports.getaddprof_to_subject = async (req, res) => {
    // ---------- This is to call the subject from table or database
    // Query to fetch subject_ID from the subject table
    const subjectQuery = 'SELECT subject_id, subject_name FROM subject';

    connection.query(subjectQuery, (error, subjectResults) => {
        if (error) throw error;
        
        // Extract subject_ID values from the results
        const subjects = subjectResults.map(result => result.subject_id);


            // Render the addprof_to_subject page with subjects and teachers data
            res.render('addprof_to_subject', { subjects });
    });
};

exports.postaddprof_to_subject = async (req, res) => {
    const {subject_id, teacher_id, teacher_name} = req.body;

    const query = `INSERT INTO assignprof (subject_id, teacher_id, teacher_name) VALUES (?, ?, ?)`;
    connection.query(query, [subject_id, teacher_id, teacher_name], (err, result) => {

        if (req != null){
            if (err) {
                console.error(err);
                res.render('addprof_to_subject');
            } else {
                res.render('admin');
            }
        };

    });
        }
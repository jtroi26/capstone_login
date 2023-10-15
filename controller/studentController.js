const mysql = require('mysql');
var express = require('express');

// Create a MySQL connection pool for better performance
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'capstone'
});

exports.getstudent = async (req, res) => {
    // ---------- This is to call the subject from table or database
    // Query to fetch subject_ID from the subject table
    const query = 'SELECT subject_id FROM subject';

    connection.query(query, (error, results) => {
        if (error) throw error;
        
        // Extract subject_ID values from the results
        const subjects = results.map(result => result.subject_id);
        
        // Render the student page with subjects data
        res.render('student', { subjects });
    });
};

exports.poststudent = async (req, res) => {
    const {student_id, first_name, middle_name, last_name, year_level, username, password} = req.body;

    const query = `INSERT INTO student (student_id, first_name, middle_name, last_name, year_level, username, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    connection.query(query, [student_id, first_name, middle_name, last_name, year_level, username, password], (err, result) => {

        if (req != null){
            if (err) {
                console.error(err);
                res.render('student');
            } else {
                res.render('adminprof');
            }
        };

    });

};
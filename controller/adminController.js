const mysql = require('mysql');
var express = require('express');

exports.getadmin = async (req, res) => {
    const subjectQuery = 'SELECT teacher_id FROM teacher';

    connection.query(subjectQuery, (error, subjectResults) => {
        if (error) throw error;
        
        // Extract subject_ID values from the results
        const teacher = subjectResults.map(result => result.teacher_id);


            // Render the addprof_to_subject page with subjects and teachers data
            res.render('admin', { teacher });
    });
    }

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'capstone'
});

exports.postadmin = async (req, res) => {
    const { teacher_id, first_name, last_name, username, password } = req.body;

    const query = `INSERT INTO teacher (teacher_id, first_name, last_name, username, password) VALUES (?, ?, ?, ?, ?)`;
    connection.query(query, [teacher_id, first_name, last_name, username, password], (err, result) => {

        if (req != null){
            if (err) {
                console.error(err);
                res.render('prof');
            } else {
                res.render('adminprof');
            }
        };
    });

    };


// Add a new route and controller function for updating the password
exports.updatePassword = async (req, res) => {
    const { teacher_id, password } = req.body;
  
    const query = `UPDATE teacher SET password = ? WHERE teacher_id = ?`;
    connection.query(query, [password, teacher_id], (err, result) => {
      if (err) {
        console.error(err);
        res.render('admin'); // You can redirect to an error page or handle it differently.
      } else {
        res.render('adminprof'); // Redirect to the success page or handle it accordingly.
      }
    });
  };
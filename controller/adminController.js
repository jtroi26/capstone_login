const mysql = require('mysql');
var express = require('express');

exports.getadmin = async (req, res) => {
    // Query to get teacher_id values
    const teacherQuery = 'SELECT teacher_id FROM teacher';
    
    // Query to get student_id values
    const studentQuery = 'SELECT student_id FROM student';

    // Execute both queries in parallel
    connection.query(teacherQuery, (teacherError, teacherResults) => {
        if (teacherError) throw teacherError;

        connection.query(studentQuery, (studentError, studentResults) => {
            if (studentError) throw studentError;

            // Extract teacher_id values from the results
            const teacher = teacherResults.map(result => result.teacher_id);

            // Extract student_id values from the results
            const student = studentResults.map(result => result.student_id);

            // Render the admin page with teacher and student data
            res.render('admin', { teacher, student });
        });
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
        res.redirect('/admin') // Redirect to the success page or handle it accordingly.
      }
    });
  };

  exports.student_updatePassword = async (req, res) => {
    const { student_id, password } = req.body;
  
    const query = `UPDATE student SET password = ? WHERE student_id = ?`;
    connection.query(query, [password, student_id], (err, result) => {
      if (err) {
        console.error(err);
        res.render('admin'); // You can redirect to an error page or handle it differently.
      } else {
        res.redirect('/admin') // Redirect to the success page or handle it accordingly.
      }
    });
  };





// For viewing prof accounts.
  
exports.getprofaccount = async (req, res) => {
        // Retrieve data from the "teacher" table
        connection.query('SELECT * FROM teacher', (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving data from the database');
            } else {
                res.render('profaccounts', { teachers: rows });
            }
        });
}

exports.postprofaccount = async (req, res) => {
    res.render('profaccounts');
}

exports.viewprofaccount = async (req, res) => {
    // Retrieve data from the "teacher" table
    const teacherId = req.params.id;
    connection.query('SELECT * FROM teacher WHERE id = ?', [teacherId], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        } else {
            res.render('viewteacher', { teacher: rows[0] });
        }
    });
}

exports.editprofaccount = async (req, res) => {
    const teacherId = req.params.id;
    connection.query('SELECT * FROM teacher WHERE id = ?', [teacherId], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        } else {
            res.render('editteacher', { teacher: rows[0] });
        }
    });
}

exports.updateprofaccount = async (req, res) => {
    const teacherId = req.params.id;
    const { teacher_id, first_name, last_name, username, password } = req.body;
    
    const updateQuery = 'UPDATE teacher SET teacher_id = ?, first_name = ?, last_name = ?, username = ?, password = ? WHERE id = ?';
    connection.query(updateQuery, [teacher_id, first_name, last_name, username, password, teacherId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating teacher information');
        } else {
            res.redirect('/profaccounts'); // Redirect to the teacher table view after successful update
        }
    });
}

exports.deleteprofaccount = async (req, res) => {
    const teacherId = req.params.id;
    connection.query('DELETE FROM teacher WHERE id = ?', [teacherId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting data from the database');
        } else {
            res.redirect('/profaccounts');
        }
    });
}
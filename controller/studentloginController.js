const mysql = require('mysql');
var express = require('express');
const rateLimit = require('express-rate-limit');

// Create a MySQL connection pool for better performance
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'capstone'
});
exports.getstudentlogin = async (req, res) => {
    res.render('studentlogin')
    }

    const MAX_LOGIN_ATTEMPTS = 3; // Set the maximum login attempts

    const limiter = rateLimit({
        windowMs: 5 * 60 * 1000, // 5 minutes window
        max: MAX_LOGIN_ATTEMPTS, // Maximum number of login attempts
        handler: function (req, res) {
            res.render('studentlogin', { error: 'You have reached the maximum login attempts.' });
        }
    });

exports.poststudentlogin = [limiter, (req, res) => {

    const { username, password } = req.body;

    if (req.session.studentloginAttempts >= MAX_LOGIN_ATTEMPTS) {
        // If maximum login attempts reached, show an error message
        return res.render('studentlogin', { error: 'You have reached the maximum login attempts.' });
    }

        // Check the credentials against the database
        connection.query(`SELECT * FROM student WHERE username = ? AND password = ?`,
            [username, password], function (err, results, fields) {
                if (err) {
                    console.error(err);
                    res.send('Database error');
                } else {
                    if (results.length > 0) {
                        const first_name = results[0].first_name; // Assuming first_name is unique
                        req.session.studentfirst_name = first_name; // Set first_name in the session
                        req.session.studentusername = username;
                        req.session.studentpassword = password;
                        req.session.studentloginAttempts = 0; // Reset login attempts on successful login
                        res.redirect('/studentmodule');
                    } else {
                        // Increment login attempts counter
                        req.session.studentloginAttempts++;
                        return res.render('studentlogin', { error: 'Invalid username or password for student.' });
                    }
                }
            });
    }];
        
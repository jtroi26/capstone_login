const mysql = require('mysql');
const express = require('express');
const rateLimit = require('express-rate-limit');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'capstone'
});

exports.getadminprof = (req, res) => {
    res.render('adminprof');
}

const MAX_LOGIN_ATTEMPTS = 3; // Set the maximum login attempts

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 5 minutes window
    max: MAX_LOGIN_ATTEMPTS, // Maximum number of login attempts
    handler: function (req, res) {
        res.render('adminprof', { error: 'You have reached the maximum login attempts. Please Try again!' });
    }
});

exports.postadminprof = [limiter, (req, res) => {
    const { username, password } = req.body;

    if (req.session.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        // If maximum login attempts reached, show an error message
        return res.render('adminprof', { error: 'You have reached the maximum login attempts.' });
    }

    if (username === "admin123" && password === "admin123") {
        // For the admin user
        req.session.username = username;
        req.session.loginAttempts = 0; // Reset login attempts on successful login
        return res.redirect('/admin');
    } else {
        // Check the credentials against the database
        connection.query('SELECT * FROM teacher WHERE username = ? AND password = ?', [username, password], function (err, results, fields) {
            if (err) {
                console.error(err);
                return res.send('Database error');
            } else {
                if (results.length > 0) {
                    const first_name = results[0].first_name; // Assuming first_name is unique
                    req.session.proffirst_name = first_name; // Set first_name in the session
                    req.session.username = username; // Set username in the session
                    req.session.password = password;
                    req.session.loginAttempts = 0; // Reset login attempts on successful login
                    return res.redirect('/prof');
                } else {
                    // Increment login attempts counter
                    req.session.loginAttempts++;
                    return res.render('adminprof', { error: 'Invalid username or password for professor.' });
                }
            }
        });
    }
}];


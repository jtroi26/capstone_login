const mysql = require('mysql');
var express = require('express');

// Create a MySQL connection pool for better performance
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'capstone'
});
exports.getstudentmodule = async (req, res) => {

        res.render('studentmodule', { username: req.session.studentusername, password: req.session.studentpassword, first_name: req.session.studentfirst_name, error: null,});

    }
exports.poststudentmodule = async (req, res) => {
        res.render('studentmodule');
    }

exports.postforgotpassword = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword, username } = req.body;

    if (oldPassword === req.session.studentpassword) {
        if (newPassword === confirmPassword) {
            const updateQuery = "UPDATE student SET password = ? WHERE username = ?";
            connection.query(updateQuery, [newPassword, username], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.render('studentmodule', { error: 'Error updating password.' });
                }
                req.session.studentpassword = newPassword;
                res.redirect('/studentmodule');
            });
        } else {
            console.log('New Password and Confirm Password do not match.');
            return res.render('studentmodule', { error: 'New Password and Confirm Password do not match.' });
        }
    } else {
        console.log('Old Password does not match.');
        return res.render('studentmodule', { error: 'Old Password does not match.' });
    }
    };
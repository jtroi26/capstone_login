const mysql = require('mysql');
var express = require('express');

// Create a MySQL connection pool for better performance
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'capstone'
});
exports.getlogout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error destroying session');
        } else {
            console.log('logout na')
            res.redirect('/adminprof'); // Redirect to your login page after logout
        }
    });
}

exports.postlogout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error destroying session');
        } else {
            console.log('logout na')
            res.redirect('/adminprof'); // Redirect to your login page after logout
        }
    });
}

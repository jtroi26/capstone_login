const mysql = require('mysql');
var express = require('express');

// Create a MySQL connection pool for better performance
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'capstone'
});
exports.getprof = async (req, res) => {
    // Render the 'adminprof' template and pass the username from the session
    res.render('prof', { first_name: req.session.proffirst_name, username: req.session.username });


    }
exports.postprof = async (req, res) => {
        res.render('prof');
        }
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

        res.render('studentmodule', { username: req.session.studentusername });

    }
exports.poststudentmodule = async (req, res) => {
        res.render('studentmodule');
        }
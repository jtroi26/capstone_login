const mysql = require('mysql');
var express = require('express');

// Create a MySQL connection pool for better performance
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'capstone'
});
exports.getIndex = async (req, res) => {
    res.render('index')
}

exports.postIndex = async (req, res) => {
    res.render('index');
}

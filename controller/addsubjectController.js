const mysql = require('mysql');
var express = require('express');

exports.getaddsubject = async (req, res) => {
    res.render('addsubject')

    }

    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'capstone'
    });

exports.postaddsubject = async (req, res) => {

    const {subject_id, subject_name} = req.body;

    const query = `INSERT INTO subject (subject_id, subject_name) VALUES (?, ?)`;
    connection.query(query, [subject_id, subject_name], (err, result) => {

        if (req != null){
            if (err) {
                console.error(err);
                res.render('prof');
            } else {
                res.render('adminprof');
            }
        };

    });
        }
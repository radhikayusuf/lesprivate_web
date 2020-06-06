'use strict';

var response = require('../utils/res');
var connection = require('../conn');

exports.create = function(req, res) {
    let body = req.body
    let notValidField = []

    if (body.curriculum == null || body.curriculum.trim() == "")
        notValidField.push("Nama Kurikulum")

    if (body.cost == null)
        notValidField.push("Biaya")

    if (body.description == null || body.description.trim() == "")
        notValidField.push("Deskripsi")

    let query = "INSERT INTO curriculum(curriculum, cost, description) VALUES ('"+body.curriculum+"', "+body.cost+", '"+body.description+"')";
    connection.query(query, function (error, rows, fields) {
        if(error){
            response.error(error.sqlMessage, res)
        } else {            
            var data = {
                'code': 200,
                'message' : "Success",                
            };
            res.json(data);
            res.end();
        }
    });
};

exports.update = function(req, res) {
    let body = req.body
    let notValidField = []

    if (body.curriculumId == null)
        response.systemError("Error please provide curriculum id.", res)

    if (body.curriculum == null || body.curriculum.trim() == "")
        notValidField.push("Nama Kurikulum")

    if (body.cost == null)
        notValidField.push("Biaya")

    if (body.description == null || body.description.trim() == "")
        notValidField.push("Deskripsi")

    let query = "UPDATE curriculum SET curriculum = '"+body.curriculum+"', cost = "+body.cost+", description = '"+body.description+"' WHERE id_curriculum = " +body.curriculumId ;
    connection.query(query, function (error, rows, fields) {
        if(error){
            response.error(error.sqlMessage, res)
        } else {            
            var data = {
                'code': 200,
                'message' : "Success",                
            };
            res.json(data);
            res.end();
        }
    });
};

exports.curriculum = function(req, res) {
    connection.query('SELECT * FROM curriculum', function (error, rows, fields) {
        if(error){
            response.error(error.sqlMessage, res)
        } else {            
            response.ok(rows, res)
        }
    });
};

exports.curriculumById = function(req, res) {    
    connection.query('SELECT * FROM curriculum WHERE id_curriculum = ' + req.params.id, function (error, rows, fields) {
        if(error){
            response.error(error.sqlMessage, res)
        } else {            
            if (rows.length == 0) {
                response.empty(rows, res)
            } else {
                response.ok(rows[0], res)
            }
        }
    });
};

exports.deleteById = function(req, res) {    
    connection.query('DELETE FROM curriculum WHERE id_curriculum = ' + req.params.id, function (error, rows, fields) {
        if(error){
            response.error(error.sqlMessage, res)
        } else {            
            response.ok(null, res)
        }
    });
};
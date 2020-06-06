'use strict';

var response = require('../utils/res');
var connection = require('../conn');

exports.users = function(req, res) {
    connection.query('SELECT * FROM users', function (error, rows, fields) {
        if(error){
            console.log(error)
        } else {            
            response.empty(rows, res)
        }
    });
};

exports.login = function(req, res) {
    let body = req.body
    let notValidField = []

    if (body.email == null || body.email.trim() == "")
        notValidField.push("Email")

    if (body.password == null || body.password.trim() == "")
        notValidField.push("Password")

    if (notValidField.length > 0) {
        let lastError = notValidField.length == 1 ? '' : ' and ' + notValidField.pop()
        let fieldsError = notValidField.length == 0 ? '' : notValidField.join(', ') 
        response.error("Harap isi : " + fieldsError + lastError, res)
    } else {
        let query = "SELECT * FROM users WHERE email = '"+body.email+"' AND password = md5('" + body.password +"')"
        connection.query(query, function (error, rows, fields) {            
            if(error || rows.length == 0){
                response.error("Email atau Kata Sandi salah, harap periksa kembali.", res)
            } else {                
                response.ok(rows, res)
            }
        });       
    }
};

exports.register = function(req, res) {
    var notValidField = []
    let body = req.body

    if (body.fullname == null || body.fullname.trim() == "")
        notValidField.push("Nama Lengkap")

    if (body.username == null || body.username.trim() == "")
        notValidField.push("Nama Pengguna")

    if (body.email == null || body.email.trim() == "")
        notValidField.push("Alamat Email")

    if (body.password == null || body.password.trim() == "")
        notValidField.push("Jenjang Pendidikan")

    if (body.password == null || body.password.trim() == "")
        notValidField.push("Kata Sandi")

    if (notValidField.length > 0) {
        let lastError = notValidField.length == 1 ? '' : ' and ' + notValidField.pop()
        let fieldsError = notValidField.length == 0 ? '' : notValidField.join(', ') 
        response.error("Harap isi : " + fieldsError + lastError, res)
    } else {
        let query = "INSERT INTO users(username, fullname, email, password, level) VALUES('"+body.username+"', '"+body.fullname+"', '"+body.email+"', md5('"+body.password+"'), '"+body.level+"')";        
        connection.query(query, function (err, result, fields) {            
            if (err) {
                response.error(err.sqlMessage, res)
            } else {
                response.ok("Berhasil mendaftarkan user", res)
            }                
          });        
    }
};

exports.completeprofile = function(req, res) {
    var notValidField = []
    let body = req.body

    if (body.userId == null || body.userId.trim() == "")
        response.systemError("Error please provide user id.", res)

    if (body.phonenumber == null || body.phonenumber.trim() == "")
        notValidField.push("Nomor Telepon")

    if (notValidField.length > 0) {
        let lastError = notValidField.length == 1 ? '' : ' and ' + notValidField.pop()
        let fieldsError = notValidField.length == 0 ? '' : notValidField.join(', ') 
        response.error("Harap isi : " + fieldsError + lastError, res)
    } else {
        let query = "UPDATE users SET phonenumber = '"+body.phonenumber+"' WHERE id_user = '"+ body.userId +"'";
        connection.query(query, function (err, result, fields) {            
            if (err) {
                response.error(err.sqlMessage, res)
            } else {
                response.ok("Berhasil menambahkan informasi tambahan user", res)
            }                
          });        
    }
};
'use strict';

var response = require('../utils/res');
var connection = require('../conn');

exports.create = async function(req, res) {
    let body = req.body
    let notValidField = []

    if (body.curriculum_id == null || body.curriculum_id.trim() == "")
        notValidField.push("Id Kurikulum tidak di temukan")

    if (body.schedules == null || body.schedules == [])
        notValidField.push("Harap isi jadwal terlebih dahulu")

    if (body.description == null || body.description.trim() == "")
        notValidField.push("Deskripsi")

    let result = await insertSchedule(body.id_user, body.id_curriculum)    
    if (result != null) {        
        let schedule = await findLastSchedule(body.id_user, body.id_curriculum)

        var element;
        for (element in body.schedules) {            
            await insertDetailSchedule(schedule.id_schedule, body.schedules[element])
        }              
    }
    
    var data = {
        'code': 200,
        'message' : "Success",
        'data' : true
    };
    res.json(data);
    res.end();

    function insertSchedule(id_user, id_curriculum) {        
        return new Promise(resolve => {            
            let query = "INSERT INTO schedules(id_user, id_curriculum) VALUES ("+id_user+", "+id_curriculum+")";            
            connection.query(query, function (error, rows, fields){
                if(error){                
                    resolve(null)
                } else{
                    resolve(rows);
                }
            });
        });
    }

    function insertDetailSchedule(id_schedule, schedule){        
        return new Promise(resolve => {        
            let query = "INSERT INTO detail_schedule(title, id_schedule, schedule_time, location, detail_location, lat, lang) VALUES ('"+schedule.title+"', "+id_schedule+", "+schedule.time+", '"+schedule.location+"', '"+schedule.locationDetail+"', 0, 0)";             
            console.log(query)
            connection.query(query, function (error, rows, fields){
                if(error){
                    resolve(null)
                } else{
                    resolve(rows);
                }
            });
        });
    }

    function findLastSchedule(id_user, id_curriculum) {
        return new Promise(resolve => {
            let query = "SELECT * FROM schedules WHERE id_user = "+id_user+" AND id_curriculum = "+id_curriculum+" ORDER BY 1 DESC";            
            connection.query(query, function (error, rows, fields){
                if(error && rows.length == 0){                
                    resolve(null)
                } else{
                    resolve(rows[0]);
                }
            });
        });
    }
};


exports.schedule = async function(req, res){

    let schedules = await getSchedules();
    var index;
    for (index in schedules) {
        schedules[index].detail = await getDetailSchedule(schedules[index].id_schedule)
    }    

    var data = {
        'code': 200,
        'message' : "Success",
        'data' : schedules
    };
    res.json(data);
    res.end();
    
    function getSchedules() {
        return new Promise(resolve => {
            let query = "SELECT * FROM schedules ORDER BY 1 ASC";
            connection.query(query, function (error, rows, fields){
                if(error){                
                    resolve(null)
                } else{
                    resolve(rows);
                }
            });
        });
    }

    function getDetailSchedule(id_schedule) {
        return new Promise(resolve => {            
            let query = "SELECT * FROM detail_schedule WHERE id_schedule = "+id_schedule+" ORDER BY 1 DESC";
            console.log(query)
            connection.query(query, function (error, rows, fields){
                if(error){                
                    resolve(null)
                } else{
                    resolve(rows);
                }
            });
        });
    }
};
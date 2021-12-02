'use strict';
var dbConn = require('./../dbconfig');
//Employee object create
var Alarm = function(alarm){
  this.id  = alarm.id;
  this.label  = alarm.label;
  this.startTime = alarm.startTime;
  this.endTime = alarm.endTime;
};


Alarm.create = function (newAlarm, result) {
    dbConn.query("INSERT INTO alarms set ?", newAlarm, function (err, res) {
    if(err) {
        console.log("error: ", err);
        result(err, null);
    }
    else{
        console.log(res.insertId);
        result(null, res.insertId);
    }
});
};

Alarm.findAll = function (result) {
    dbConn.query("Select * from alarms", function (err, res) {
    if(err) {
        console.log("error: ", err);
        result(err, null);
    }
    else{
        result(null, res);
    }
    });
};

Alarm.update = function(id, alarmsToUpdate, result){
    dbConn.query("UPDATE alarms SET label=?,startTime=?,endTime = ? WHERE id = ?", [alarmsToUpdate.label,alarmsToUpdate.startTime,alarmsToUpdate.endTime, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }else{
            result(null, alarmsToUpdate);
        }
    });
};


Alarm.delete = function(id, result){
    dbConn.query("DELETE FROM alarms WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};


module.exports = Alarm;

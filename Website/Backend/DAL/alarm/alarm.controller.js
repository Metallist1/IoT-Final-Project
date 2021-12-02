'use strict';

const Alarm = require('./alarm.service');

exports.findAll = function(req, res) {
    Alarm.findAll(function(err, alarms) {
        if (err)
        res(err, null);
        res(null, alarms);
    });
};

exports.create = function(req, res) {
    const new_Alarm = new Alarm(req);
    //handles null error
    if(req.constructor === Object && Object.keys(req).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Alarm.create(new_Alarm, function(err, response) {
            if (err) res(err, null);

            res(null, {message:"Alarm added successfully!",data:response});
        });
    }
};

exports.findById = function(req, res) {
    Alarm.findById(req, function(err, response) {
        if (err)
        res(err , null);
        res(null, response);
    });
};

exports.update = function(req, res) {
    Alarm.update(req.sensorId, req, function(err, response) {
        if (err)
        res(err , null);
        res(null, response);
    });
};

exports.delete = function(req, res) {
    Alarm.delete(req.id, function(err, response) {
        if (err)
        res(err , null);
        res(null, response);
    });
};
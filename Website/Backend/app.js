// MQTT 
var mqtt = require('mqtt');

var options = {
    host: 'bb3263d7c44a4b7aa6f5a1e3b4ab626d.s2.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'ned405',
    password: 'Password123'
}

var client = mqtt.connect(options);

//Controllers


const alarmController =   require('./DAL/alarm/alarm.controller');

// Express

const app = require('express')();
const bodyParser = require('body-parser');

const http = require('http');
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
//Sockets

const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

// Socket setup
//const io = socket(server);


// Middleware
app.use(bodyParser.json());

server.listen(PORT, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.info(`Server is running on port ${PORT}.`);
    }
});


// MQTT
//setup the callbacks

client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    //Called each time a message is received
    console.log('Received message:', topic, message.toString());

    if(topic === 'sensor/change'){
        io.emit("sensor_changed", {timestamp: JSON.parse(message).timestamp, type: JSON.parse(message).type});
    }

    if(topic === 'sensor/alarms/getAll'){
        alarmController.findAll(null, function(err, temper) {
            if (err){
                console.log(err);
            }
            else{
                client.publish('alarms/getAll', JSON.stringify(temper));
            }
        });
    }
});

// subscribe to topic 'my/test/topic'

client.subscribe('sensor/change');

client.subscribe('sensor/alarms/getAll');


//Socket IO

io.on("connection", function (socket) {
    console.log("Made socket connection");
    alarmController.findAll(null, function(err, temper) {
        if (err){
            console.log(err);
        }
        else{
            socket.emit("all_alarms", temper);
        }
    });

    socket.on('create_alarm', (alarm) => {
        alarmController.create(alarm, function(err, alarmCreated) {
            if (err){
                console.log(err);
            }
            else{
                io.emit("created_alarm", {id: alarmCreated.data, label: alarm.label, startTime: alarm.startTime, endTime: alarm.endTime});
                client.publish('alarms/created', JSON.stringify({id: alarmCreated.data, label: alarm.label, startTime: alarm.startTime, endTime: alarm.endTime}));
            }
        });
    });

    socket.on('remove_alarm', (alarm) => {
        alarmController.delete(alarm, function(err, alarmDeleted) {
            if (err){
                console.log(err);
            }
            else{

                alarmController.findAll(null, function(err, alarms) {
                    if (err){
                        console.log(err);
                    }
                    else{
                        io.emit("all_alarms", alarms);
                    }
                });
                client.publish('alarms/deleted', JSON.stringify(alarm));
            }
        });
    });

    socket.on('update_alarm', (alarm) => {
        alarmController.update(alarm, function(err, alarmDeleted) {
            if (err){
                console.log(err);
            }
            else{

                alarmController.findAll(null, function(err, alarms) {
                    if (err){
                        console.log(err);
                    }
                    else{
                        io.emit("all_alarms", alarms);
                    }
                });
                client.publish('alarms/updated', JSON.stringify(alarm));
            }
        });
    });

    socket.on("disconnect", () => {
        console.log("User disconnect");
    });

  });
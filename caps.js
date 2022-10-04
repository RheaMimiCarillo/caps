'use strict'

// import socket.io into this app and all associated socket.io methods
const io = require('socket.io');

// declare a PORT for connections
// conenct to the PORT in the .env, or connect to 3002
const PORT = process.env.PORT || 3002;

let server = io(PORT);

// declare a `caps` namespace on the /caps endpoint
const caps = (server.of('/caps'));

// use chance package
const Chance = require('chance');
const chance = new Chance();

let logger = (payload, eventName) =>
{
  let event = {
    "event": eventName,
    // chance.js random date object generator
    "time": chance.date(),
    "payload": payload,
  }
  console.log("EVENT", event);
  // events.emit("EVENT", event);
};

// listen for 'connection' events
caps.on('connection', (socket) =>
{
  eventPool.forEach(event =>
  {

  });
});
const eventPool = require('./src/GlobalEventPool');

module.exports = caps;

'use strict';

// import socket.io into this app and all associated socket.io methods
const io = require('socket.io');

// declare a PORT for connections
// connect to the PORT in the .env, or connect to 3002
const PORT = process.env.PORT || 3002;

const eventPool = require('../GlobalEventPool');


const MessageQueue = require('../MessageQueue/MessageQueue.js');

const outGoingQueue = new MessageQueue();

// create a 'server' object
const server = io(PORT);

// declare a `caps` namespace on the /caps endpoint
const CAPS = (server.of('/caps')); // client sockets connect to localhost 3002

// use chance package
const Chance = require('chance');
const chance = new Chance();

let logger = (payload, eventName) =>
{
  let event = {
    'event': eventName,
    // chance.js random date object generator
    'time': chance.date(),
    'payload': payload,
  };
  console.log('EVENT', event);
  // events.emit("EVENT", event);
};

// listen for 'connection' events
// pass in the 'socket' object (that has a lot of data) from the client
// the socket comes from the client, to the server, upon connection
CAPS.on('connection', (socket) =>
{
  console.log('new client connected! ID: ', socket.id);

  // now, we can tell what the client to do, since they are connected

  // have client join a room
  // "when a socket joins, make them join a room"
  socket.on('join', (payload) =>
  {
    // get the `vendorId` from the vendor's payload
    // the client gets to choose what their own `vendorId` is, in this case
    socket.join(payload.clientId);
    console.log('joined room: ', payload.clientId);
    // we're always going to want to know what clientId is in what room, because we want to only send parcel messages to certain clients

    // driver must know the clientId associated with the parcel

    // steps: 1. have driver join 'wal-mart' room
    // 2. have them listen for 'pickup' events
  });

  socket.on('pickup', (payload) =>
  {
    console.log('thing happened: ', 'pickup', payload);

    // emit a notification from server to a specific room
    // emit to the `vendorId ` room, in this case
    socket.to(payload.clientId ).emit('pickup', payload);
  });

  socket.on('getAll', (payload) =>
  {
    outGoingQueue.get(payload.clientId).forEach(message =>
    {
      // we don't want the users to see the clientId, so just extract the messages from the payload and send those to the users as 'message' events
      // this emits back to the same client that published the 'get-messages' event
      socket.emit('message', message);
    });
    // should get an array of message objects
  });

  /*
  eventPool.forEach(event =>
  {
    console.log('thing happened: ', event, payload);

    // emit a notification from server to a specific room
    // emit to the `vendorId ` room, in this case
    socket.to(payload.vendorId).emit(event, payload);

    // call logger here, to generate the formatted message
    socket.to(payload.vendorId).console.log(logger(payload, event));
  });
  */
});

// this way isn't 'circular' on it's own
// the server won't get a message back
// emit from server to all events
// caps.emit('SERVER MESSAGE', { message: 'hey, how\'s it going?' });


module.exports = CAPS;

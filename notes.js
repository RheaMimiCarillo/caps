'use strict';

const io = require('socket.io');

// socket namespace example:
const bananaNamespace = io.of('/banana');
// the above is a banana namespace with the "/banana" endpoint

// to have clients automatically join a room of the server's choosing

// have the server listening for 'connection' events
// a `socket` is passed in with the connection event
bananaNamespace.on('connection', (socket) =>
{
  // have them join "chocolate room" automatically, upon connection
  socket.join('chocolateRoom');

  // within the `bananaNamespace`, emit a "hello" message to the `chocolateRoom`
  bananaNamespace.to('chocolateRoom').emit('hey, how\'s it going?');
});
// then run `socket.join("some room name");
//

/* message queue */
// message queue has two boxes: 1. outgoing queue, 2. received queue
// the outgoing queue is messages that have yet to be sent out

// the message queue in the socket server makes copies of the payload (messages) and holds them until the client gets them
// client 

// queue functionalities:
// 1. add a message into the queue
// 2. read all messages in the queue
// 3. remove a message from the queue (after confirming that the recipient has read the messaGE)

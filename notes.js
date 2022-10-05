'use strict';


// socket namespace example:
const bananaNamespace = io.of("/banana");
// the above is a banana namespace with the "/banana" endpoint

// to have clients automatically join a room of the server's choosing

// have the server listening for 'connection' events
// a `socket` is passed in with the connection event
bananaNamespace.on("connection", (socket) =>
{
  // have them join "chocolate room" automatically, upon connection
  socket.join("chocolateRoom");

  // within the `bananaNamespace`, emit a "hello" message to the `chocolateRoom`
  bananaNamespace.to("chocolateRoom").emit("hey, how's it going?");
});
// then run `socket.join("some room name");
//

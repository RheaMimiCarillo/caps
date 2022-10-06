'use strict';

const io = require('socket.io-client');

const handleDriverInTransit = require('./handleDriver');
const handleDriverDelivered = require('./handleDriver');

// the url of the server we want to connect to
const url = process.env.SERVER_URL || 'http://localhost:3002/caps';


// connect to the caps namespace at that URL
// the caps namespace is waiting for 'connection' events and will fire off
// events in response to clients connecting
// create a `socket` object that's maintained by the server(socket.io) for this
const socket = io.connect(url);

// the `{ vendorId: 'Rhea\'s bodega' }` is the `payload` that we're sending to the server, in this case
// server-side: we'll access `payload.vendorId`
socket.emit('join', { vendorId: 'Rhea\'s bodega' });


// listen for delivered events
// when a package gets delivered, respond to the ether with "Thank you, <customer-name"
// 5. "As a vendor, I want to be notified when my package has been delivered."
// events.on('delivered', (payload) => handleVendorDelivered(payload));
socket.on('pickup', (payload) =>
{
  // proof of life
  console.log('I\'ve noticed your package 👀');

  // order has been picked up and is in transit
  handleDriverInTransit(payload);


  socket.on('in-transit', (payload) =>
  {
    // then, deliver the package
    handleDriverDelivered(payload);
  });
});

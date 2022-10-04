'use strict'

const io = require('socket.io-client');

const handleVendorDelivered = require('./handleVendor');
const handleVendorPickupRequest = require('./handleVendor');

// connect to the caps namespace at that URL
// the caps namespace is waiting for 'connection' events and will fire off
// events in response to clients conencting
// create a `socket` object that's maintained by the server(socket.io) for this
const socket = io.connect('http://localhost:3002/caps')

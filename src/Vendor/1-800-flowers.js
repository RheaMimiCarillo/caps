'use strict'


const vendorId = 'flowers-r-us';

const clientId = 'driver';

const handleVendorDelivered = require('./handleVendor')

// maybe make a variable to bring in functions from 'handleVendor'

// bring in the MessageClient class
const MessageClient = require('../MessageQueue/MessageClient');

// make a new MessageClient queue for flowers-r-us
const vendorQueue = new MessageClient(vendorId);

// a 'driver' will send a 'delivered' event on the `vendorQueue`
vendorQueue.subscribe('delivered', (payload) =>
{
  // proof of life for a delivery
  console.log(`${vendorId} sees that their package has been picked up and is now in-transit`);
});

vendorQueue.publish('pickup', {
  text: 'hey, I have a thing that\'s ready for pickup'
});

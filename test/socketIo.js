// 'use strict';

// const assert = require('chai').assert;
// const io = require('socket.io-client');
// const app = require('../app.js');
// const log = require('../app/utils/logger');

// const url = `http://localhost:${app.get('port')}`;
// log.info(url);

// describe('socket.io connection', () => {

//   it('should connect and get a message', (done) => {

//     const player1 = io(url);

//     player1.on('connect', (result) => {
//       log.info('connected', result);
//     });

//     player1.emit('message', {text: 'hello'});
//     player1.on('message', (message) => {
//       log.debug(message);
//       done();
//     });

//   });

//   after(() => {
//     app.close();
//   });

// });

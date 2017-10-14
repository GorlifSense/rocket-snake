'use strict';

const log = require('./utils/logger');

class Game {

  listen(io) {
    this.sockets = io.sockets;

    io.on('connection', (socket) => {
      log.debug('SOCKET Connection detected', socket);
      // socket.setNoDelay(true); // NOTE to disable Nagle's algorithm
      socket.on('message', (message) => {

        log.info('-> incoming message: %s', message);
        log.info('<- outgoing message: %s', message);
        socket.write(message);
      });
      socket.on('disconnect', () => {
        log.debug('SOCKET client disconnected');
      });
    });
  }

}

module.exports = Game;

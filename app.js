'use strict';

const DEFAULT_PORT = 4300;
const SERVER_PORT = process.env.PORT || DEFAULT_PORT;

const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const favicon = require('serve-favicon');

const Game = require('./models/Game');
// const log = require('./app/utils/logger');

// Expose all static resources in /public
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Redirect to the main page
app.get('/', (request, response) => {
  response.sendFile('index.html', {root: path.join(__dirname, 'public')});
});

app.set('port', SERVER_PORT);

// Start Express server
server.listen(app.get('port'), () => {
  // log.info('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

io.on('connection', (socket) => {
  // log.debug('SOCKET Connection detected', socket);

  socket.on('message', (message) => {
    // log.info('-> incoming message: %s', message);
    // log.info('<- outgoing message: %s', message);
    socket.write(message);
  });

  socket.on('game', () => {
    const game = new Game();

    socket.on('player', (id) => {
      game.addSnake(id);
      socket.broadcast.emit('player', id);
    });

    socket.on('start', () => {
      game.placeSnakes();
      game.placeFoodRandom();
      game.start();

      const STEP_INTERVAL = 1000;
      const steper = setInterval(() => {
        Game.makeSnakeMove();
        Game.eatFood();
        Game.findCrashedSnakesId();
        Game.removeCrashedSnakes();
      }, STEP_INTERVAL);
      socket.broadcast.emit('start');

      socket.on('end', () => {
        game.end();
        clearInterval(steper);
        socket.broadcast.emit('end');
      });

    });

    socket.on('write', (id, action) => {
      game.writeAction(id, action);
      socket.broadcast.emit('write', {id, action});
    });

  });


  socket.on('disconnect', () => {
    log.debug('SOCKET client disconnected');
  });

});


app.close = () => {
  server.close(() => {
    log.debug('Server stopped');
  });
};

module.exports = app;

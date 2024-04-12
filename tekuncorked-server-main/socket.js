const socketIo = require('socket.io');

const configureSocket = (server)=> {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
    }
  });
  return io;
}

module.exports = {configureSocket};

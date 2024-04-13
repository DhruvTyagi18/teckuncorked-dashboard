const socketIo = require('socket.io');

const configureSocket = (server)=> {
  const io = socketIo(server, {
    cors: {
      origin: "https://teckuncorked-dashboard.vercel.app/",
    }
  });
  return io;
}

module.exports = {configureSocket};

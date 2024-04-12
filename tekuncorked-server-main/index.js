const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const createDbConnection = require('./db');
const { configureSocket } = require('./socket');
const getDevices = require('./controllers/getDevice');



const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;

const io = configureSocket(server);

global.io = io;

io.on('connection', async (socket) => {
  console.log(`user with socket id ${socket.id} is connected`);

  try {
    const devices = await getDevices();
    socket.emit('data', devices);

  } catch (error) {
    console.log('error fetching devices during connection');
  }

  socket.on('disconnect', () => {
    console.log('a user got disconnected');
  });
});





const corsOptions = {
  origin: 'http://localhost:3000',
};
//middlewares
app.use(cors(corsOptions));
app.use(express.json());


//routes
const deviceRoute = require('./routes/device');
app.use('/device', deviceRoute);

//db connection
createDbConnection();

server.listen(9000, () => {
  console.log(`server is listening on port 9000`);
});




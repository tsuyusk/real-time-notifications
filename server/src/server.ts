import express from 'express';
import 'dotenv/config';

import { createServer } from 'http';
import cors from 'cors';
import socket from 'socket.io';

import './database';
import rootUser from './routes/index.routes';

const app = express();
const server = createServer(app);
const io = socket(server);

interface IConnectedUsers {
  [key: string]: any;
}

const connectedUsers: IConnectedUsers = {};

const port = process.env.PORT || 3333;

io.on('connection', socket => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;

  socket.on('disconnect', () => {
    delete connectedUsers[user];
  });
});

app.use(cors());
app.use(express.json());
app.use((request, response, next) => {
  request.io = io;
  request.connectedUsers = connectedUsers;

  return next();
});
app.use(rootUser);

server.listen(port);

console.log(`Server listening on *:${port}`);

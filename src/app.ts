import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Socket.IO connection handling
io.on('connection', (socket: Socket) => {
  console.log('A user connected.');

  socket.on('message', (message: string) => {
    console.log('Received message:', message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

// Start the server
const PORT = 7000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import { Server as SocketIOServer, Socket } from 'socket.io';
import allowedOrigins from './allowedOrigins';

const connectSocket = (server: any) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: allowedOrigins as Array<string>,
      methods: ['GET', 'POST'],
    },
  });

  // Set up event handlers for Socket.IO connections
  io.on('connection', (socket: Socket) => {
    console.log('A user connected', socket.id);

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  return io;
};

export default connectSocket;

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

    socket.on('roll', () => {
      console.log('roll event called');
      const generateRandomNumbers = (count : number ) : Array<number> => {
        const min = 1;
        const max = 9;
        const randomNumbers = [];
      
        for (let i = 0; i < count; i++) {
          const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
          randomNumbers.push(randomNumber);
        }
      
        return randomNumbers;
      }
      const randomNumbers : Array<number> = generateRandomNumbers(15);
      console.log('numbers: ', randomNumbers);
      socket.emit('results', randomNumbers);
    });


    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  return io;
};

export default connectSocket;

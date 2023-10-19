import { Server as SocketIOServer, Socket } from 'socket.io';
import allowedOrigins from './allowedOrigins';
import { generateRandomNumbers } from './utilities/generateRandomNumbers';
import SlotMachine from './utilities/slotmachine';

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

    socket.on('roll', (lines : number, bet : number) => {
      // console.log('roll event called');
      // console.log('lines: ', lines);
      
      const randomNumbers : Array<number> = generateRandomNumbers(15);
      const slotMachine = new SlotMachine(randomNumbers, lines, bet);
      const total_score = slotMachine.totalScore();
      // console.log('numbers: ', randomNumbers);
      console.log('total score: ', total_score);
      socket.emit('results', randomNumbers);
      socket.emit('score', total_score);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  return io;
};

export default connectSocket;

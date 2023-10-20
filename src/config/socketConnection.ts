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

    socket.on('roll', (lines : number, bet : number, balance : any) => {
      const newBalance = balance - (lines * bet);
      const randomNumbers : Array<number> = generateRandomNumbers(15);
      const slotMachine = new SlotMachine(randomNumbers, lines, bet);
      const points_won = slotMachine.totalScore();
      console.log('old balance: ', newBalance);
      console.log('points won: ', points_won);
      socket.emit('results', randomNumbers);
      socket.emit('score', newBalance + points_won, points_won);
    });
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  return io;
};

export default connectSocket;

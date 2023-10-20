"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const allowedOrigins_1 = __importDefault(require("./allowedOrigins"));
const generateRandomNumbers_1 = require("./utilities/generateRandomNumbers");
const slotmachine_1 = __importDefault(require("./utilities/slotmachine"));
const connectSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: allowedOrigins_1.default,
            methods: ['GET', 'POST'],
        },
    });
    // Set up event handlers for Socket.IO connections
    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);
        socket.on('roll', (lines, bet, balance) => {
            const newBalance = balance - (lines * bet);
            const randomNumbers = (0, generateRandomNumbers_1.generateRandomNumbers)(15);
            const slotMachine = new slotmachine_1.default(randomNumbers, lines, bet);
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
exports.default = connectSocket;

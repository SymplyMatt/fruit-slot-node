"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const allowedOrigins_1 = __importDefault(require("./allowedOrigins"));
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
        socket.on('roll', () => {
            const generateRandomNumbers = (count) => {
                const min = 1;
                const max = 9;
                const randomNumbers = [];
                for (let i = 0; i < count; i++) {
                    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                    randomNumbers.push(randomNumber);
                }
                return randomNumbers;
            };
            const randomNumbers = generateRandomNumbers(15);
            socket.emit('results', randomNumbers);
        });
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
    return io;
};
exports.default = connectSocket;

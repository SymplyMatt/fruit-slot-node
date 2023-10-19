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
        socket.on('roll', (lines, bet) => {
            // console.log('roll event called');
            // console.log('lines: ', lines);
            const randomNumbers = (0, generateRandomNumbers_1.generateRandomNumbers)(15);
            const slotMachine = new slotmachine_1.default(randomNumbers, lines, bet);
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
exports.default = connectSocket;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const machineLines_1 = __importDefault(require("./machineLines"));
class SlotMachine {
    constructor(slotNumbers, lines, bet) {
        this.totalScore = () => {
            const slotmachine = new machineLines_1.default(this.slotNumbers, this.lines);
            const total_score = slotmachine.getTotalScore();
            return total_score;
        };
        this.slotNumbers = slotNumbers;
        this.lines = lines;
        this.bet = bet;
    }
}
exports.default = SlotMachine;

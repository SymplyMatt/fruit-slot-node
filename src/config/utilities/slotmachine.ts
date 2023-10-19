import SlotMachineWinningLines from "./machineLines";

export interface indexes {
    lineOneIndexes : Array<Array<number>>;
    lineTwoIndexes : Array<Array<number>>;
    lineThreeIndexes : Array<Array<number>>;
}

export default class SlotMachine {
    public slotNumbers
    public  lines
    public bet
    constructor(slotNumbers : Array<number>, lines : number, bet:number) {
      this.slotNumbers = slotNumbers;
      this.lines = lines;
      this.bet = bet;
    }
    public totalScore = () : number => {
        const slotmachine = new SlotMachineWinningLines(this.slotNumbers, this.lines);
        const total_score = slotmachine.getTotalScore(); 
        return total_score 
    }
}



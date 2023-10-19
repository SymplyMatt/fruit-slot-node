import data from "./data";
import SlotMachine, { indexes } from "./slotmachine";

export default class SlotMachineWinningLines {
    public slotNumbers
    public lines
    constructor(slotNumbers : Array<number>, lines : number) {
        this.slotNumbers = slotNumbers;
        this.lines = lines;
    }
    private findConsecutiveIndexesWithSameValue(arr: number[]): number[][] {
        const consecutiveIndexes: number[][] = [];
        let currentSequence: number[] = [0];
    
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] === arr[i - 1]) {
                currentSequence.push(i);
            } else {
                if (currentSequence.length > 1) {
                    consecutiveIndexes.push([...currentSequence]);
                }
                currentSequence = [i];
            }
        }
    
        if (currentSequence.length > 1) {
            consecutiveIndexes.push([...currentSequence]);
        }
    
        return consecutiveIndexes;
    }
    private findWinningIndexes = (slotNumbers : Array<number>) : indexes => {
        
        const winningIndexes = this.findConsecutiveIndexesWithSameValue(slotNumbers).filter( array =>{
            if(!(array.includes(4) && array.includes(5)) && !(array.includes(9) && array.includes(10))){
                return array
            }
        });
        const lineOneIndexes : Array<Array<number>> = winningIndexes.filter( array =>{
            if(((array.includes(5)) || (array.includes(6)) || (array.includes(7)) || (array.includes(8)) || (array.includes(9))) ){
                return array
            }
        });
        const lineTwoIndexes : Array<Array<number>> = winningIndexes.filter( array =>{
            if(((array.includes(0)) || (array.includes(1)) || (array.includes(2)) || (array.includes(3)) || (array.includes(4))) ){
                return array
            }
        });
        const lineThreeIndexes : Array<Array<number>> = winningIndexes.filter( array =>{
            if(((array.includes(10)) || (array.includes(11)) || (array.includes(12)) || (array.includes(13)) || (array.includes(14))) ){
                return array
            }
        });
        return {
            lineOneIndexes,
            lineTwoIndexes,
            lineThreeIndexes
        }
    }
    public getTotalScore = ()  : number => {
        this.getLineOneScore(this.findWinningIndexes([0,0,0,0,0,...this.slotNumbers.slice(5,10),0,0,0,0,0]).lineOneIndexes);
        this.lines > 1 && this.getLineTwoScore(this.findWinningIndexes([...this.slotNumbers.slice(0,5),0,0,0,0,0,0,0,0,0,0]).lineTwoIndexes);
        this.lines > 2 && this.getLineThreeScore(this.findWinningIndexes([0,0,0,0,0,0,0,0,0,0,...this.slotNumbers.slice(10,15)]).lineThreeIndexes);
        return 1
    };

    private getLineOneScore = (winningIndexes : Array<Array<number>>) => {
        let indexes = winningIndexes.filter(item => item.includes(5) || item.includes(9)); 
    };
    private getLineTwoScore = (winningIndexes : Array<Array<number>>) => {
        let indexes = winningIndexes.filter(item => item.includes(0) || item.includes(4)); 
    };
    private getLineThreeScore = (winningIndexes : Array<Array<number>>) => {
        let indexes = winningIndexes.filter(item => item.includes(10) || item.includes(14)); 
    };
}
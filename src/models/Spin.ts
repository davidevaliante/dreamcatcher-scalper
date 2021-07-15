import { SlotResultSymbols, SpinResultSymbols } from '../utils/utils'
import { Symbol } from './Symbol'

export class Spin {
    constructor(
        // unique identifier
        public _id :  string,

        // time related - when the spin occurred
        public timeOfSpin : number,
        public rawTime : string,
        public date : Date,

        public spinResultSymbol : SpinResultSymbols,      

        public multiplier : string,

        public specialMultiplier : string,
       
        public totalWinners : number,

        public totalPayout : number,

        public watchVideo : string,
    ){}
    
}

export const buildEmptySpin = () : Spin => new Spin(
    'defaultId',

    0,
    '',
    new Date(),

    SpinResultSymbols.one,

    '',

    '',

    0,

    0,

    'no_video'
)


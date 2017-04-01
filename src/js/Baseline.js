import {Utilities} from './Baseline.Utilities';
import {Modal} from './Baseline.Modal';

class Baseline {
    
    constructor(){
        this.Utilities = Utilities;
        this.Modal = Modal;
    }
}

global.Baseline = new Baseline();
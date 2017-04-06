import {Utilities} from './Baseline.Utilities';
import {Components} from './Baseline.Components';

class Baseline {
    
    constructor(){
        this.Utilities = Utilities;
        this.Components = new Components();
    }
}

global.Baseline = new Baseline();
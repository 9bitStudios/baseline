import {Utilities} from './Baseline.Utilities';
import {Modal} from './Baseline.Modal';
import {Tabs} from './Baseline.Tabs';
import {Accordion} from './Baseline.Accordion';

class Baseline {
    
    constructor(){
        this.Utilities = Utilities;
        this.Modal = Modal;

        let tabs = new Tabs();
        let accordion = new Accordion();
    }
}

global.Baseline = new Baseline();
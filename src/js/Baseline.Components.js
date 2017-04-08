import {Utilities} from './Baseline.Utilities';
import {Alerts} from './Baseline.Components.Alerts';
import {Modal} from './Baseline.Components.Modal';
import {Tabs} from './Baseline.Components.Tabs';
import {Accordion} from './Baseline.Components.Accordion';

export class Components {
    
    constructor(){
        this.Modal = Modal;
        let tabs = new Tabs();
        let alerts = new Alerts();
        let accordion = new Accordion();
    }
}
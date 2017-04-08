import $ from 'jquery';
import {Utilities} from './Baseline.Utilities';

export class Alerts {
    
    constructor(){
        $(document).ready(() => this.init());
    }

    init(){
        $('.baseline-alert-close').on('click', (e) =>{
            $(e.currentTarget).closest('.baseline-alert').fadeOut();
        });
    }
}
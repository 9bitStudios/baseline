import $ from 'jquery';
import {Utilities} from './Baseline.Utilities';

export class Accordion {
    
    constructor(){
        $(document).ready(() => this.init());
    }

    init(){
        /*** ACCORDION ***/
        var nbsAccordionSliding = false;
        $('.baseline-accordion').find('.baseline-accordion-header').click(function() {

            if(!nbsAccordionSliding) {
                nbsAccordionSliding = true;

                if($(this).hasClass("activeItem")) {
                    $(this).removeClass('activeItem');
                }
                else { 
                    $(this).addClass('activeItem');	
                }

                $(this).next().slideToggle({
                    duration: 300, 
                    queue: false, 
                    easing: 'linear', 
                    complete: function() {
                        nbsAccordionSliding = false;
                    }
                });
            }
        }).next().hide();        
    }
}
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

                if($(this).hasClass("active")) {
                    $(this).removeClass('active');
                }
                else { 
                    $(this).addClass('active');	
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
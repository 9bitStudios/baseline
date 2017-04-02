import $ from 'jquery';
import {Utilities} from './Baseline.Utilities';

export class Modal {
    
    constructor(selector){
        this.selector = selector;
        this.addBackground();
    }

    addBackground(){
		// if this has already been added we don't need to add it again
		if ($('.baseline-modal-background').length === 0) {
		    let background = '<div class="baseline-modal-background"></div>';
		    $('body').prepend(background);
            this.setEventHandlers();
		}        
    }

    setEventHandlers(){

		$('.baseline-modal-background').on("click", () => this.hide());

        let timeout;
        
		$(window).on("resize", e => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.positionModal();
            });
		});
    }

    removeEventHandlers(){
        $(".baseline-modal-background").off("click"); 
    }

    show(){
        $(".baseline-modal-background").css({ "opacity": "0.7" }).fadeIn("fast");
        $(this.selector).fadeIn("slow");
        this.positionModal();
    }

    hide(){
        $(".baseline-modal-background").fadeOut("fast");
        $(this.selector).fadeOut("fast");
    }

    positionModal(){

        var object = $(this.selector);
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		var popupWidth = object.width();				
		var popupHeight = object.height();

		var topPos = (windowHeight / 2) - (popupHeight / 2);
		var leftPos = (windowWidth / 2) - (popupWidth / 2);
		if(topPos < 30) topPos = 30;
		
		object.css({
		    "top": topPos,
		    "left": leftPos
		});
    }

}
import $ from 'jquery';
import {Utilities} from './Baseline.Utilities';

export class Tabs {
    
    constructor(){
        $(document).ready(() => this.init());
    }

    init() {
        $(".baseline-tab-content").hide(); 
        $("ul.baseline-tabs li:first").addClass("active").show(); 
        $(".baseline-tab-content:first").show(); 

        $("ul.baseline-tabs li").click(function (e) {
            e.preventDefault();
            $("ul.baseline-tabs li").removeClass("active"); 
            $(this).addClass("active"); 
            $(".baseline-tab-content").hide(); 
            var activeTab = $(this).find("a").attr("href"); 
            $(activeTab).fadeIn(); 
            return false;
        });        
    }
}
$(function(){$("ul.nav li.dropdown").hover(function(){$(this).find(".dropdown-menu").stop(!0,!0).delay(200).fadeIn(500)},function(){$(this).find(".dropdown-menu").stop(!0,!0).delay(0).fadeOut(500)})}),function(e){e(document).on("click","a.clickHere",function(){toggleMainDiv()}),e.fn.menumaker=function(o){var n=e(this),t=e.extend({title:"Menu",format:"dropdown",sticky:!1},o);return this.each(function(){n.prepend('<div id="menu-button">'+t.title+'<span class="menu-toggle-icon"></span></div>'),e(this).find("#menu-button").on("click",function(){n.find(".submenu-button").siblings("ul").removeClass("open").hide(),n.find(".submenu-button").removeClass("submenu-opened"),e(this).toggleClass("menu-opened");var o=e(this).next("ul");o.hasClass("open")?o.hide().removeClass("open"):(o.show().addClass("open"),"dropdown"===t.format&&o.find("ul").show())}),n.find("li ul").parent().addClass("has-sub");var o="ontouchstart"in document.documentElement?"touchstart":"click";multiTg=function(){n.find(".submenu-button").on(o,function(){e(this).siblings("ul").hasClass("open")?(e(this).siblings("ul").removeClass("open").hide(),e(this).removeClass("submenu-opened")):(n.find("li ul").removeClass("open").hide(),n.find(".submenu-button").removeClass("submenu-opened"),e(this).addClass("submenu-opened"),e(this).siblings("ul").addClass("open").show())})},"multitoggle"===t.format?multiTg():n.addClass("dropdown"),t.sticky===!0&&n.css("position","fixed"),resizeFix=function(){e(window).width()<=1024&&n.find("ul").removeClass("open")},resizeFix()})}}(jQuery),function(e){e(document).on("click","#user_span",function(){e(window).width()<=1024&&e("#my_account_dropdown").toggleClass("open")}),e(document).ready(function(){e("#cssmenu").menumaker({title:"Menu",format:"multitoggle"}),e("#cssmenu").prepend("<div id='menu-line'></div>");var o,n,t,i,s=!1,a=0,r=e("#cssmenu #menu-line");e("#cssmenu > ul > li").each(function(){e(this).hasClass("active")&&(o=e(this),s=!0)}),s===!1&&(o=e("#cssmenu > ul > li").first()),i=n=o.width(),void 0!=o.position()&&(t=a=o.position().left),r.css("width",n),r.css("left",a),e("#cssmenu > ul > li").hover(function(){o=e(this),n=o.width(),a=o.position().left,r.css("width",n),r.css("left",a)},function(){r.css("left",t),r.css("width",i)})})}(jQuery),toggleMainDiv=function(){"MSIE7"==version||"MSIE8"==version||"MSIE9"==version?$(".homepage_overview").toggle("slow"):$(".homepage_overview").slideToggle("slow",function(){var e=$(".homepage_overview").offset();$("body,html").animate({scrollTop:parseInt(e.top-$(".eqi-strip-new").height()-60)},750)})},$(function(){$("#mobile_android_ios_popup").is(":visible")||setTimeout(function(){closeRoadBlockPopup()},4e3),heartBeatProcess()});var heartBeatTime=5e4;heartBeatProcess=function(){if(heartBeatContinue)var e=$.ajax({type:"GET",url:"/common-request",data:"step=heart_beat",dataType:"json",success:function(o){"success"==o.status?continue_process=!0:("LOGOUT"==o.message&&(continue_process=!1),e.abort(),continue_process=!0),continue_process?setTimeout(function(){heartBeatProcess()},heartBeatTime):heartBeatContinue=!1}})},promotion={continue_to_site:function(){showLoader("loading","display-block"),promotion.set_cookie_javascript("user_roadblock_cookie",1,1),setTimeout(function(){$(".promotion_main, .pageoverlay").remove(),$(".site_hide").removeClass("hide"),showLoader("loading","display-none")},1e3)},set_cookie_javascript:function(e,o,n){var t=new Date;t.setTime(t.getTime()+24*n*60*60*1e3);var i="expires="+t.toUTCString(),s="path=/";document.cookie=e+"="+o+"; "+i+"; "+s}},$(document).ready(function(){$(".icon-close").click(function(e){e.preventDefault(),closeRoadBlockPopup()})}),closeRoadBlockPopup=function(){$(".promotion-screen").addClass("easing"),$(".promotion-screen").animate({left:"80%",top:"8%",width:"10%",height:"10%",opacity:0},500,function(){$(this).fadeOut(),$(".promotion-screen").remove(),$(".pageoverlay").remove()}),promotion.set_cookie_javascript("user_roadblock_cookie",1,1)},checkvalidname=function(e){$.ajax({type:"GET",url:"/common-request",data:"step=name_verify&name="+e.value,dataType:"json",success:function(o){if("success"==o.status)$("#"+e.id+"_validator").length>0&&($("#"+e.id+"_validator").removeClass("validate_fail"),$("#"+e.id).removeClass("error"));else{if($("#customer_name_error_indicator").length>0)return $("#customer_name_error_indicator").removeClass("hide"),$("#customer_name_error_message").html(o.message),$("#"+e.id).addClass("error"),!1;if($("#"+e.id+"_validator").length>0)return $("#"+e.id+"_validator").addClass("validate_fail"),$("#"+e.id).addClass("error"),!1;if($("#first_name").length>0)return $("#first_name").addClass("error"),!1;if($("#"+e.id+"_error_indicator").length>0)return $("#"+e.id+"_error_indicator").removeClass("hide"),$("#"+e.id+"_error_message").html(o.message),$("#"+e.id).addClass("error"),!1}}})},sendGA=function(e,o,n){return ga("paTrackerObj.send",{hitType:"event",eventCategory:e,eventAction:o,eventLabel:n}),!0};
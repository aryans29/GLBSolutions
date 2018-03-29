$(function () {    
    if ( $.isFunction($.fn.feedBackBox) ) {
	$('#feedback_form').feedBackBox();
    }
 
});
(function($) {
//    $(document).on("click", ".has-sub", function(){
//	if($(".dropDown").css("display") != "block"){
//	    $(".dropDown").css("display", "none");
//	}
//    });
    $(document).on("click", "a.clickHere", function(){
		toggleMainDiv();
    });
  $.fn.menumaker = function(options) {
      
      var cssmenu = $(this), settings = $.extend({
        title: "Menu",
        format: "dropdown",
        sticky: false
      }, options);

      return this.each(function() {
        cssmenu.prepend('<div id="menu-button">' + settings.title + '<span class="menu-toggle-icon"></span></div>');
        $(this).find("#menu-button").on('click', function(){
			
			cssmenu.find('.submenu-button').siblings('ul').removeClass('open').hide();
			cssmenu.find('.submenu-button').removeClass('submenu-opened');
			
          $(this).toggleClass('menu-opened');
          var mainmenu = $(this).next('ul');
          if (mainmenu.hasClass('open')) { 
            mainmenu.hide().removeClass('open');
          }
          else {
            mainmenu.show().addClass('open');
            if (settings.format === "dropdown") {
              mainmenu.find('ul').show();
            }
          }
        });

        cssmenu.find('li ul').parent().addClass('has-sub');
		var clickHandler = ('ontouchstart' in document.documentElement ? "touchstart" : "click");
        multiTg = function() {          
          cssmenu.find('.submenu-button').on(clickHandler, function() {
            if ($(this).siblings('ul').hasClass('open')) {
              $(this).siblings('ul').removeClass('open').hide();
			  $(this).removeClass('submenu-opened');
            }
            else {
			  cssmenu.find('li ul').removeClass("open").hide();
			  cssmenu.find('.submenu-button').removeClass('submenu-opened');
	          $(this).addClass('submenu-opened');
			  $(this).siblings('ul').addClass('open').show();
            }
          });
        };

        if (settings.format === 'multitoggle') multiTg();
        else cssmenu.addClass('dropdown');

        if (settings.sticky === true) cssmenu.css('position', 'fixed');

        resizeFix = function() {
          if ($(window).width() <= 1024) {
            cssmenu.find('ul').removeClass('open');
          }
        };
        resizeFix();
        //return $(window).on('resize', resizeFix);

      });
  };
})(jQuery);

(function($){
	
	$(document).on("click", "#user_span", function(){
		if ($(window).width() <= 1024) {
			$("#my_account_dropdown").toggleClass("open");
		}
	});
	
	$(document).ready(function() {
  $("#cssmenu").menumaker({
    title: "Menu",
    format: "multitoggle"
  });

  $("#cssmenu").prepend("<div id='menu-line'></div>");

var foundActive = false, activeElement, linePosition = 0, menuLine = $("#cssmenu #menu-line"), lineWidth, defaultPosition, defaultWidth;

$("#cssmenu > ul > li").each(function() {
  if ($(this).hasClass('active')) {
    activeElement = $(this);
    foundActive = true;
  }
});

if (foundActive === false) {
  activeElement = $("#cssmenu > ul > li").first();
}

defaultWidth = lineWidth = activeElement.width();

defaultPosition = linePosition = activeElement.position().left;

menuLine.css("width", lineWidth);
menuLine.css("left", linePosition);

$("#cssmenu > ul > li").hover(function() {
  activeElement = $(this);
  lineWidth = activeElement.width();
  linePosition = activeElement.position().left;
  menuLine.css("width", lineWidth);
  menuLine.css("left", linePosition);
}, 
function() {
  menuLine.css("left", defaultPosition);
  menuLine.css("width", defaultWidth);
});

});
})(jQuery);


toggleMainDiv = function(){
    //alert(mobile_view);
    if(version == "MSIE7" || version == "MSIE8" || version == "MSIE9"){
	$(".homepage_overview").toggle("slow");
    } else {
	$(".homepage_overview").slideToggle("slow", function(){
	    //if(mobile_view ){	    
		var position = $(".homepage_overview").offset();
		$('body,html').animate({scrollTop: parseInt(position.top)}, 750);            

	    //}
	});
    }   
}


//FOR TRACKING WHETHER CUSTOMER IS ONLINE OR NOT
//RECORD LAST ACTIVITY OF CUSTOMER
$(function () {
    if (!$('#mobile_android_ios_popup').is(':visible')) {
	setTimeout(function () {
	    //$('.web-app-download-info').hide();
	    closeRoadBlockPopup();
	}, 4000);
    }
    heartBeatProcess();
});
var heartBeatTime = 50000;
heartBeatProcess = function () {    
    if (heartBeatContinue) {
		var heartBeatAjax = $.ajax({
			type: "GET",
			url: "/common-request",
			data: "step=heart_beat",
			dataType: 'json',
			success: function (response) {
			if (response.status == "success") {
				continue_process = true;
			} else {
				if(response.message == "LOGOUT"){
				continue_process = false;	
				}
				heartBeatAjax.abort();
				continue_process = true;		    
			}
			if(continue_process){
				setTimeout(function () {			
				heartBeatProcess();
				}, heartBeatTime);
			} else {
				heartBeatContinue = false;
			}
			}
		});
    }
}

//FOR SHOWING ROADBLOCK ON ANDROID AND IOS MOBILES FOR INSTALLING MOBILE APPLICATION
promotion = {
    continue_to_site: function () {
	showLoader('loading', 'display-block');
	promotion.set_cookie_javascript("user_roadblock_cookie", 1, 1);
	setTimeout(function () {
	    $(".promotion_main, .pageoverlay").remove();
	    $(".site_hide").removeClass("hide");
	    showLoader('loading', 'display-none');
	}, 1000);
    },
    set_cookie_javascript: function (cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
        var path = "path=/";
	document.cookie = cname + "=" + cvalue + "; " + expires + "; " + path;
    }
}
$(document).ready(function () {
    $(".icon-close").click(function (e) {
	e.preventDefault();
	closeRoadBlockPopup();
    });
});

closeRoadBlockPopup = function () {
    
	$('.promotion-screen').addClass('easing');
	$('.promotion-screen').animate({
	    left: "80%",
	    top: "8%",
	    width: "10%",
	    height: "10%",
	    opacity: 0,
	}, 500, function () {
	    $(this).fadeOut();
	    $('.promotion-screen').remove();
	    $('.pageoverlay').remove();
	})
//$(".popup-wrapper").fadeOut();
    promotion.set_cookie_javascript("user_roadblock_cookie", 1, 1);
}

checkvalidname = function (inputobj) {
    $.ajax({
        type: "GET",
        url: "/common-request",
        data: "step=name_verify&name="+inputobj.value,
        dataType: 'json',
        success: function (response) {
            if (response.status == "success") {
                if($('#'+inputobj.id+'_validator').length > 0) {
                    $('#'+inputobj.id+'_validator').removeClass('validate_fail');
                    $('#'+inputobj.id).removeClass('error');
                }
            } else {
                if($('#customer_name_error_indicator').length > 0) {
                    $('#customer_name_error_indicator').removeClass('hide');
                    $('#customer_name_error_message').html(response.message);
                    $('#'+inputobj.id).addClass('error');
                    return false;
                } else if($('#'+inputobj.id+'_validator').length > 0) {
                    $('#'+inputobj.id+'_validator').addClass('validate_fail');
                    $('#'+inputobj.id).addClass('error');
                    return false;
                } else if($('#first_name').length > 0) {
                    $('#first_name').addClass('error');
                    return false;
                } else if($('#'+inputobj.id+'_error_indicator').length > 0) {
                    $('#'+inputobj.id+'_error_indicator').removeClass('hide');
                    $('#'+inputobj.id+'_error_message').html(response.message);
                    $('#'+inputobj.id).addClass('error');
                    return false;
                }
            }
        }
    });
}
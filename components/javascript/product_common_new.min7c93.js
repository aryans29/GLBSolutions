function profession_date_validate(e,r){var a="",o="",t=0;""==e?(a=$("#month_of_profession").val(),o=$("#year_of_profession").val()):2==r?o=e:a=e,1==a.length&&$("#month_of_profession").val("0"+a),0!=parseInt(o)&&""!=o||(r=1),1==o.length&&$("#year_of_profession").val("0"+o);var s=/^(0[0-9]|1[0-1])$/,n=/^([0-9]{2})$/;return""!=a&&null!=a.match(s)||""!=e&&1!=r||(t=1),(""==o||null==o.match(n)||o>"99")&&(""!=e&&2!=r||(t=1)),t}function view_child_quote(e){"+"==$(e).parents("ul.show-info").find("a.view_child_quote:eq(0)").text()?($(e).parents("ul.show-info").find("a.view_child_quote:eq(0)").text("-"),$(".quote_div_"+$(e).attr("parent_bank_id")).show("slow"),$(e).parents("ul.show-info").find(".cat_toggle").text("less")):($(e).parents("ul.show-info").find("a.view_child_quote:eq(0)").text("+"),$(".quote_div_"+$(e).attr("parent_bank_id")).hide("slow"),$(e).parents("ul.show-info").find(".cat_toggle").text("more"))}function start_einocome_process(e){$.ajax({type:"POST",url:"/"+page_action_url+"/",crossDomain:!0,data:"&step=eincome_process&process_step=1&bank_account_id="+e,dataType:"json",beforeSend:function(){$(".overlay").show(),$("#loading").removeClass("display-none").addClass("display-block"),$(".income-status").addClass("income-processing").removeClass("income-verify"),$(".income_status_txt").text("Verifing income...")},success:function(e){if($(".einocme-popup-form").remove(),"success"==e.status){eincome_process_flag=1,$(".eincome_popup_txt").remove(),$("#loading").addClass("display-none").removeClass("display-block"),$(".einocme-popup ").removeClass("hide");var r=document.createElement("form");$(".iframe-popup-box").css("height","800px"),r.setAttribute("method","post"),r.setAttribute("action",e.html.nodeUrl),r.setAttribute("target","einocme_frame"),delete e.html.nodeUrl,$.each(e.html,function(e,a){var o=document.createElement("input");o.setAttribute("type","hidden"),o.setAttribute("name",e),o.setAttribute("value",a),r.appendChild(o),document.body.appendChild(r)}),$(".einocme-popup-form").html(r),r.submit()}}})}function getting_eincome(){xhr=$.ajax({type:"POST",url:"/"+page_action_url+"/",crossDomain:!0,data:"&step=eincome_process&process_step=2",dataType:"json",beforeSend:function(){xhr&&4!=xhr.readyState&&xhr.abort()},success:function(e){"success"==e.status&&('"false"'==e.html||"false"==e.html||'"false"'==e.html?($(".income-status").addClass("income-not-verified").removeClass("income-verify"),$(".income_status_txt").text("Income not verified")):"true"!=e.html&&'"true"'!=e.html||($(".income-status").addClass("income-verified").removeClass("income-verify"),$(".income-verified").removeClass("hide"),$(".income_status_txt").text("Income verified")))}})}function eincomePopupResponse(e){"SUCCESS"==e.data&&($("[data-dismiss=modal]").trigger({type:"click"}),$("#eincome-popup").removeClass("display-block").addClass("display-none"),$(".overlay").removeClass("display-none").addClass("display-block").css("display","none"),getting_eincome())}var eincome_process_flag=0;$(function(){$(document).on("change","#pan_number",function(){($(this).hasClass("fa-check")||$(this).hasClass("fa-times"))&&($("#full_name_status").addClass("hide").removeClass("fa-check").removeClass("fa-times"),$("#pan_number_status").addClass("hide").removeClass("fa-check").removeClass("fa-times"),$(".full_name_error_indicator").html(""),$(".pan_number_error_indicator").html("")),$("#full_name_status").addClass("hide").removeClass("fa-check").removeClass("fa-times"),$("#pan_number_status").addClass("hide").removeClass("fa-check").removeClass("fa-times"),$(".pan_number_error_indicator").html(""),$(".full_name_error_indicator").html("");var e=$("#pan_number").val();if(isPAN(e)){var r=$("#pan_number").attr("product"),a=$("input[name='full_name']").val();""!=a&&panVerification(e,r,a)}}),window.addEventListener("message",eincomePopupResponse,!1),$(document).on("click",".view_child_quote",function(){view_child_quote($(this))}),$(document).on("click",".do_eincome_process",function(){$("#eincome-popup").removeClass("display-none").addClass("display-block")}),$(document).on("click","#fast_track_application",function(){$("#eincome_account").val($("#eincome_account1").val()),$("#eincome-popup").removeClass("display-none").addClass("display-block"),start_einocome_process($("#eincome_account").val()),$("#common_modal").modal("show")}),$(document).on("click","#start_eincome_process",function(){""!=$("#eincome_account").val()&&start_einocome_process($("#eincome_account").val())}),$("#get_report_btn").on("click",function(){var e=$(bureau_check_journey).attr("otp_prequote_screen");$(bureau_check_journey).attr("skip_bureau_hit","false"),$.inArray($("#mobile_number").val(),["8882911939","9717799004","9953221740","920528016","8805018355","9777777777","9111111111"]),e?(showLoader("loading","display-block"),$.ajax({type:"POST",url:"/"+page_action_url+"/",data:"&step=resend_code",dataType:"json",success:function(e){showLoader("loading","display-none"),$(".prequote_otp_div").removeClass("hide"),$("#more_question").addClass("hide"),$(".bureau_decision_div").addClass("hide"),"success"==e.status?"verified"==e.error_message&&($(".otp_div").addClass("hide"),$(bureau_check_journey).attr("otp_prequote_screen",!1)):"error"==e.status&&($("#otp_validator").removeClass("hide").addClass("error"),$("#otp_validator").html(e.error_message)),showLoader("loading","display-none")}})):($(".prequote_otp_div").removeClass("hide"),$("#more_question").addClass("hide"))}),$(document).on("click",".eincome-cancel",function(){$(".overlay").hide(),$("#eincome-popup").addClass("display-none").removeClass("display-block")}),$(document).on("click",".know-more",function(){$(".show-info").show("slide",{direction:"left"},1e3),$(this).hide()}),$(document).on("click",".step1",function(){$("#step-2").hide("slow").removeClass("fadeInRightBig").addClass("fadeOutRightBig"),$("#step-1").show("slow").removeClass("fadeOutLeftBig").addClass("fadeInLeftBig"),$(".form-loader").hide(),$(this).parent("li").removeClass("done").addClass("active").next("li").removeClass("active"),$(".step2").parents("li").html('<i class="fa fa-check-circle-o step2"></i> Eligibility Check')}),(-1!==navigator.userAgent.indexOf("MSIE")||navigator.appVersion.indexOf("Trident/")>0)&&$(".breadcrumbs").find("a[href]").each(function(){$(this).click(function(){window.location=$(this).attr("href")})}),$(document).on("keyup","#mobile_number",function(){10==$("#mobile_number").val().length&&validate_step1(2)}),$(document).on("blur","[data-validation]",function(){var e="",r=!0,a=$(this).attr("name");if(e="radio"==$(this).attr("type")||"checkbox"==$(this).attr("type")?$("input[name='"+a+"']").is(":checked")?"1":"":$(this).val(),"company_name"==$(this).attr("name")&&$(this).val($(this).val().replace(/^\s+|\s+$/g,"")),$(this).hasClass("name")){$(this).val($(this).val().replace(/^\s+|\s+$/g,""));var o=$(".name").val();o=o.replace(/^\s+|\s+$/g,""),$(".name").val(o);var t=o.split(" ");(""===o||o.length<3||t.length<1)&&(r=!1)}if($(this).hasClass("email")&&(r=formatValidatorNew("",$(this),"","","",20,"","",6,31,"")),$(this).hasClass("mobile")&&(r=formatValidatorNew("",$(this),"","","",19,"","","","","")),"month_of_profession"!=a&&"year_of_profession"!=a||profession_date_validate("","")&&(r=!1),""==e&&0==e||!r){var s=$("[name="+a+"]").parent("div").next(".help-block").attr("class");void 0==s?$("[name="+a+"]").next(".help-block").addClass("form-error").html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass("has-error"):$("[name="+a+"]").parent("div").next(".help-block").addClass("form-error").html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass("has-error")}else void 0==(s=$("[name="+a+"]").parent("div").next(".help-block").attr("class"))?$("[name="+a+"]").next(".help-block").removeClass("form-error").html("").parents(".form-group").removeClass("has-error"):$("[name="+a+"]").parent("div").next(".help-block").removeClass("form-error").html("").parents(".form-group").removeClass("has-error"),$(".show-error-red").removeClass("show-error-red"),$(".error").removeClass("error")}),$(document).on("keypress","input[name='full_name']",function(e){for(;" "==$(this).val().substring(0,1);)$(this).val($(this).val().substring(1,$(this).val().length));return formatValidatorNew(e,$(this),"","","",2,"","",2,80,"")}),$(document).on("keypress","input[name='email']",function(e){return formatValidatorNew(e,$(this),"","","",20,"","","","","")}),$(document).on("input","input[name='full_name']",function(){var e=/[^a-zA-Z ]/g;$(this).val().match(e)&&$(this).val($(this).val().replace(e,""))}),$(document).on("blur","#day_of_birth",function(){var e=$(this).val();$(this).val().length>0&&$(this).val().length<2?"Opera"!=version&&"MSIE7"!=version&&"MSIE8"!=version&&"MSIE9"!=version&&"MSIE"!=version&&(e=parseInt(0)+e,$(this).val(e)):"Opera"!=version&&"MSIE7"!=version&&"MSIE8"!=version&&"MSIE9"!=version&&"MSIE"!=version||"dd"!=e&&(e=Number(e),$(this).val(e));formValidator.dayValidate($(this))}),$(document).on("change","#day_of_birth",function(){var e=$(this).val();$(this).val().length>0&&$(this).val().length<2?"Opera"!=version&&"MSIE7"!=version&&"MSIE8"!=version&&"MSIE9"!=version&&"MSIE"!=version&&(e=parseInt(0)+e,$(this).val(e)):"Opera"!=version&&"MSIE7"!=version&&"MSIE8"!=version&&"MSIE9"!=version&&"MSIE"!=version||"dd"!=e&&(e=Number(e),$(this).val(e)),formValidator.dayValidate($(this))||($("#day_of_birth").addClass("error"),$(".dob_error_indicator").addClass("form-error"),$(".dob_error_indicator").parents(".form-group").addClass("has-error"),$(".dob_error_indicator").html($("#day_of_birth").attr("data-validation-error-msg")))}),$(document).on("blur","#month_of_birth",function(){var e=$(this).val();$(this).val().length>0&&$(this).val().length<2?"Opera"!=version&&"MSIE7"!=version&&"MSIE8"!=version&&"MSIE9"!=version&&"MSIE"!=version&&(e=parseInt(0)+e,$(this).val(e)):"Opera"!=version&&"MSIE7"!=version&&"MSIE8"!=version&&"MSIE9"!=version&&"MSIE"!=version||"mm"!=e&&""!=e&&(e=Number(e),$(this).val(e));formValidator.monthValidate($(this))}),$(document).on("blur","#year_of_birth",function(){formValidator.yearValidate($(this))}),$(document).on("change",".employment",function(){if($("#doctoral_degree").hide(),$("#self_employed_running_year_div").hide(),$("#annual-turnover").hide(),$("#nature_of_business_div").hide(),$(".mainspanResidenceType").hide(),$("#stp1modeofsalary").hide(),1==parseInt($(this).val()))$("#monthly-income").show(),$("#annually-income").hide(),$(".salaried").show(),$(".self_employed_professional").hide(),$(".self_employed_business").hide(),$("#self_employed_running_year_div").hide(),$("#employment_bank_account").html("Your salary account is with ?");else if(2==$(this).val()||3==$(this).val()){if($("#monthly-income").hide(),$("#annually-income").show(),$(".salaried").hide(),2==$(this).val())$("#step-1 #self_employed_running_year_div").show(),$(".self_employed_professional").show(),1==$("#professional_employment_type_sub_id").val()&&$("#doctoral_degree").show(),22==$("#professional_employment_type_sub_id").val()?$(".self_employed_running_year_title").text("Holding COP (Certificate of Practice) since ?"):$(".self_employed_running_year_title").text("Years In Current Profession"),$(".self_employed_business").hide(),$(".se_income_title").text("Your gross annual income ?"),$(".profession_type_title").text("Select Profession type"),$("#profession_date").attr("data-validation-error-msg","Please choose profession years");else if(3==$(this).val()){$("#annual-turnover").show();var e=unformatMoney($("#annual_turnover").val());e>=5e6&&e<=1e8?$("#annually-income").show():e>=5e5&&e<=25e5&&($("#annually-income").hide(),$("#self_employed_running_year_div").show(),$(".mainspanResidenceType").show()),$(".profession_type_title").text("Select Business type"),$(".self_employed_running_year_title").text("Years In Current Business"),$("#profession_date").attr("data-validation-error-msg","Please choose business years"),$("#profession_date").select2({placeholder:"Select Business Years",allowClear:!0}),$(".turnover_title").text("Your gross annual sales / turnover?"),$(".se_income_title").text("Your gross annual profit ?"),$("#nature_of_business_div").show(),$(".self_employed_professional").hide(),$(".self_employed_business").show()}$("#employment_bank_account").html("Your bank account is with ?")}$("[name='monthly_income'],[name='annual_income']").val("").trigger("change")}),$("#professional_employment_type_sub_id").change(function(){$(".self_employed_running_year_title").removeClass("fs13"),$(".self_employed_running_year_title").text("Years in current Profession"),$("#doctoral_degree").hide(),22==$(this).val()&&($(".self_employed_running_year_title").addClass("fs13"),$(".self_employed_running_year_title").text("Holding COP (Certificate of Practice) since ?")),1==$(this).val()&&$("#doctoral_degree").show()}),$("#annual_turnover").change(function(){$("#self_employed_running_year_div").hide(),$(".mainspanResidenceType").hide(),$("#step-1 #annually-income").show(),parseInt($(this).val())>=5e5&&parseInt($(this).val())<=25e5&&($("#self_employed_running_year_div").show(),$(".mainspanResidenceType").show(),$("#annually-income").hide())})});var allvalidate=function(e,r){var a="",o="",t="",s=!1,n=0,i=0,l=!0;$.each($("[data-validation]"),function(r,d){if(s=!1,a=$(d).attr("name"),t=$(d).attr("type"),i=parseInt($(d).attr("shifindex")),n=parseInt(e.attr("shifindex")),"radio"==t||"checkbox"==t)s=!$("input[name='"+a+"']").is(":checked");else if("full_name"==$(d).attr("name")){var m=$(".name").val();m=m.replace(/^\s+|\s+$/g,""),$(".name").val(m);var c=m.split(" ");(""===m||c.length<1)&&(s=!0)}else if("mobile_number"==$(d).attr("name"))formatValidatorNew("",$(this),"","","",19,"","",10,10,"")||(s=!0);else if("email"==$(d).attr("name"))formatValidatorNew("",$(this),"","","",20,"","","","","")||(s=!0);else if("month_of_profession"==$(d).attr("name")||"year_of_profession"==$(d).attr("name"))profession_date_validate("","")&&(s=!0);else if("day_of_birth"==$(d).attr("name")||"month_of_birth"==$(d).attr("name")||"year_of_birth"==$(d).attr("name")&&""!=$(d).val()){var _=formValidator.dayValidate($("#day_of_birth")),p=formValidator.monthValidate($("#month_of_birth")),h=formValidator.yearValidate($("#year_of_birth"));_&&p&&h||(s=!0,l=!1)}else if("pan_number"==$(d).attr("name")&&void 0!=$(d).val()&&""!=$(d).val()){var u=$("input[name='pan_number']").val();isPAN(u)||(s=!0)}else"pincode"==$(d).attr("name")&&void 0!=$(d).val()&&""!=$(d).val()?6!=$("input[name='pincode']").val().length&&(s=!0):(s=""==$(d).val()||"0"==$(d).val(),l=!0);"text"==t&&""!=$(this).attr("placeholder")&&$(this).val()==$(this).attr("placeholder")&&(s=!0),o=$("[name="+a+"]").parent("div").next("span").attr("class"),s&&n>i?void 0==o?($("span[class*='error_indicator']",$("[name="+a+"]").parents(".form-group")).addClass("form-error").html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass("has-error"),$("[name="+a+"]").addClass("error").next(".help-block").addClass("form-error").html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass("has-error")):($("[name="+a+"]").addClass("error").parent("div").next(".help-block").addClass("form-error").html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass("has-error"),$("[name="+a+"]").addClass("error").parent("div").parent("div").next(".help-block").addClass("form-error").html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass("has-error")):(l?void 0===o?($("span[class*='error_indicator']",$("[name="+a+"]").parents(".form-group")).removeClass("form-error").html("").parents(".form-group").removeClass("has-error"),$("[name="+a+"]").removeClass("error").next(".help-block").removeClass("form-error").html("").parents(".form-group").removeClass("has-error")):($("[name="+a+"]").removeClass("error").parent("div").next(".help-block").removeClass("form-error").html("").parents(".form-group").removeClass("has-error"),$("[name="+a+"]").removeClass("error").parent("div").parent("div").next(".help-block").removeClass("form-error").html("").parents(".form-group").removeClass("has-error")):void 0==o?($("span[class*='error_indicator']",$("[name="+a+"]").parents(".form-group")).addClass("form-error").html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass("has-error"),$("[name="+a+"]").addClass("error").next(".help-block").addClass("form-error").html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass("has-error")):($("[name="+a+"]").addClass("error").parent("div").next(".help-block").addClass("form-error").html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass("has-error"),$("[name="+a+"]").addClass("error").parent("div").parent("div").next(".help-block").addClass("form-error").html($(this).attr("data-validation-error-msg")).parents(".form-group").addClass("has-error")),$(".error").removeClass("error"))})};formValidator={yearValidate:function(e){var r=new Date,a=r.getFullYear()-65,o=r.getFullYear()-18,t=$(e).parents(".col-xs-4").prev().find("select"),s=$(t).parents(".col-xs-4").prev().find("select");"text"!=$(e).attr("type")&&"tel"!=$(e).attr("type")||(t=$(e).prev(),s=$(t).prev());var n=0;return n=formatValidatorNew("",$(e),"","","","4",a,o,"","",""),1==n?($(e).removeClass("error"),$(t).hasClass("error")||$(s).hasClass("error")?($(".dob_error_indicator").addClass("form-error"),$(".dob_error_indicator").parents(".form-group").addClass("has-error"),$(".dob_error_indicator").html($("input[name='"+$(e).attr("name")+"']").attr("data-validation-error-msg")),$(".dob_error_indicator").html($("select[name='"+$(e).attr("name")+"']").attr("data-validation-error-msg"))):($(".dob_error_indicator").removeClass("form-error"),$(".dob_error_indicator").parents(".form-group").removeClass("has-error"),$(".dob_error_indicator").html(""))):($(e).addClass("error"),$(".dob_error_indicator").addClass("form-error"),$(".dob_error_indicator").parents(".form-group").addClass("has-error"),$(".dob_error_indicator").html($("input[name='"+$(e).attr("name")+"']").attr("data-validation-error-msg")),$(".dob_error_indicator").html($("select[name='"+$(e).attr("name")+"']").attr("data-validation-error-msg"))),n},monthValidate:function(e){var r=$(e).parents(".col-xs-4").prev().find("select"),a=$(e).parents(".col-xs-4").next().find("select");"text"!=$(e).attr("type")&&"tel"!=$(e).attr("type")||(a=$(e).next(),r=$(e).prev());var o=formatValidatorNew("",$(e),"","","","4","1","12","","","");return 1==o?($(e).removeClass("error"),$(a).hasClass("error")||$(r).hasClass("error")?($(".dob_error_indicator").addClass("form-error"),$(".dob_error_indicator").parents(".form-group").addClass("has-error"),$(".dob_error_indicator").html($("input[name='"+$(e).attr("name")+"']").attr("data-validation-error-msg")),$(".dob_error_indicator").html($("select[name='"+$(e).attr("name")+"']").attr("data-validation-error-msg"))):($(".dob_error_indicator").removeClass("form-error"),$(".dob_error_indicator").parents(".form-group").removeClass("has-error"),$(".dob_error_indicator").html(""))):($(e).addClass("error"),$(".dob_error_indicator").addClass("form-error"),$(".dob_error_indicator").parents(".form-group").addClass("has-error"),$(".dob_error_indicator").html($("input[name='"+$(e).attr("name")+"']").attr("data-validation-error-msg")),$(".dob_error_indicator").html($("select[name='"+$(e).attr("name")+"']").attr("data-validation-error-msg"))),o},dayValidate:function(e){var r="",a="";"text"==$(e).attr("type")||"tel"==$(e).attr("type")?(r=$(e).next(),a=$(r).next()):(r=$(e).parents(".col-xs-4").next().find("select"),a=$(r).parents(".col-xs-4").next().find("select"));var o="31";o=dateValidate.calculateDays($(r).val(),$(a).val());var t=formatValidatorNew("",$(e),"","","","4","1",o,"","","");return 1==t?($(e).removeClass("error"),$(a).hasClass("error")||$(r).hasClass("error")?($(".dob_error_indicator").addClass("form-error"),$(".dob_error_indicator").parents(".form-group").addClass("has-error"),$(".dob_error_indicator").html($("input[name='"+$(e).attr("name")+"']").attr("data-validation-error-msg")),$(".dob_error_indicator").html($("select[name='"+$(e).attr("name")+"']").attr("data-validation-error-msg"))):($(".dob_error_indicator").removeClass("form-error"),$(".dob_error_indicator").parents(".form-group").removeClass("has-error"),$(".dob_error_indicator").html(""))):($(e).addClass("error"),$(".dob_error_indicator").addClass("form-error"),$(".dob_error_indicator").parents(".form-group").addClass("has-error"),$(".dob_error_indicator").html($("input[name='"+$(e).attr("name")+"']").attr("data-validation-error-msg")),$(".dob_error_indicator").html($("select[name='"+$(e).attr("name")+"']").attr("data-validation-error-msg"))),t}};var xhr="";panVerification=function(e,r,a){var o="";return $("#pan_number_loader").removeClass("hide"),$.ajax({type:"POST",url:"/common-request",data:"step=pan_verification&pan_number="+e+"&product_id="+r+"&name="+a,dataType:"json",success:function(e){if($("#pan_number_loader").addClass("hide"),o=e,"success"==e.status){$(".pan_number_error_indicator").html("Your PAN number is verified.").addClass("white"),$("#pan_number_status, #full_name_status").removeClass("hide").addClass("fa-check"),$("#pan_number, input[name='full_name']").attr("readonly",1);var r=e.extra_value.data.first_name+" "+e.extra_value.data.last_name;$("input[name='full_name']").val(r)}else"fail"==e.status||"wrong_customer_details"==e.status||e.status},error:function(e,r,a){}}),o};
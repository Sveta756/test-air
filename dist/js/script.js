"use strict";$(document).ready((function(){function e(){var e=$("#mail").val(),a=$("#phone").val(),t=$("#name").val();0!=e.length&&0!=a.length&&0!=t.length&&$("#check").is(":checked")?($(".modal__submit").removeAttr("disabled"),$(".modal__submit").css("opacity","1")):$(".modal__submit").attr("disabled","disabled")}$(".header").on("mouseenter",".header__item",(function(){$(this).find(".header__link").addClass("header__link_active"),$(this).addClass("header__item_act"),$('div[data-id="'.concat($(this).attr("data-id"),'"')).fadeIn()})),$(".header").on("mouseleave",".header__item",(function(){$(this).find(".header__link").removeClass("header__link_active"),$(this).removeClass("header__item_act"),$('div[data-id="'.concat($(this).attr("data-id"),'"')).fadeOut()})),$(window).on("scroll",(function(){$(".header").css("background","rgb(255, 255, 255)"),$("video, .opacity").css({opacity:1-.0035*$(window).scrollTop()}),$(".products").css({height:300+2*$(window).scrollTop()})})),$(".wrapper").css({height:$(window).height()+"px"}),$(".main__btn").on("click",(function(){$(".overlay, #modal").fadeIn(),$("body").css("overflow","hidden")})),$(".modal__close").on("click",(function(){$(".overlay, #modal, #thanks").fadeOut(),$("form")[0].reset(),$("body").css("overflow","")})),$(".overlay").click((function(e){0==$(e.target).closest("#modal").length&&($(this).fadeOut(),$("form")[0].reset())})),$(document).on("keydown",(function(e){27==e.keyCode&&$(".overlay, #modal, #thanks").fadeOut()})),$(".modal__form").validate({rules:{name:"required",checkbox:"required",phone:"required",email:{required:!0,email:!0}},validClass:"success",messages:{name:"Пожалуйста, введите свое имя",checkbox:"Поставьте флажок",phone:"Пожалуйста, введите свой номер телефона",email:{required:"Пожалуйста, введите свою почту",email:"Неправильно введен адрес почты"}},errorPlacement:function(e,a){if("checkbox"==a.attr("type"))return a.next("label").append(e);e.insertAfter($(a))}}),$(".modal__input").blur((function(){if(!$(this).valid())return $(this).focus(),!1})),$(".modal__input").keyup((function(){e()})),$("#check").change((function(){e()})),$("input[name=phone]").mask("+7 (999) 999-99-99"),$("form").submit((function(e){$(this).find("input").val(""),$(this).find("input").removeClass("success"),$("input:checked").prop("checked",!1),$(".modal__submit").attr("disabled","disabled"),$(".modal__submit").css("opacity","0.2"),$(this).find("textarea").val(""),$("#modal").fadeOut(),$("#thanks").fadeIn("slow"),$("form").trigger("reset")}))}));
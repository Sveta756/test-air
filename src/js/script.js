$(document).ready(function(){

    //шапка при наведении
    $('.header').on('mouseenter', '.header__item', function() {
      $(this).find('.header__link').addClass('header__link_active');
      $(this).find('.header__item_act').fadeIn();
      $(`div[data-id="${$(this).attr('data-id')}"`).fadeIn();
    });

    //шапка при отведении
    $('.header').on('mouseleave', '.header__item', function() {
      $(this).find('.header__link').removeClass('header__link_active');
      $(this).find('.header__item_act').fadeOut(50);
      $(`div[data-id="${$(this).attr('data-id')}"`).fadeOut(50);
    });

    //мобильная версия шапки
    $('.header-mobile__hamburger').click(function() {
      $('.header-mobile').css('background', '#fff');
      $(this).toggleClass('header-mobile__hamburger_active');
      if ($(this).hasClass('header-mobile__hamburger_active')) {
        $('body').css('overflow', 'hidden');
        $('.header-mobile__body').fadeIn();
        $('.header-mobile__wr').css({
          'box-shadow': ''
        });
      } else {
        $('.header-mobile__body').fadeOut();
        $('.header-mobile').css('background', '');
        $('.header-mobile__head_active').removeClass('header-mobile__head_active').next().slideUp();
        $('.header-mobile__link_active').removeClass('header-mobile__link_active').next().slideUp();
        $('.active-link').removeClass('active-link').next().slideUp();
        $('body').css('overflow', '');
        $('.overlay, #modal, #thanks').fadeOut();
        clearForm();
      }
    });

    //аккордион первый уровень
    $('.header-mobile__head').click(function() {
        $(this).toggleClass('header-mobile__head_active');
        if( $(this).toggleClass('header-mobile__head_active')) {
          // $('body').css('overflow', 'hidden');
          $(this).toggleClass('header-mobile__head_active').next().slideToggle();
          $('.header-mobile__head_active').not(this).removeClass('header-mobile__head_active').next().slideUp();
          $('.header-mobile__link-levelone').removeClass('active-link').next().slideUp();
        } 
          
    });

    //аккордион второй уровень
    $('.header-mobile__link-levelone').click(function() {
      $(this).toggleClass('active-link').next().slideToggle();
      $('.active-link').not(this).removeClass('active-link').next().slideUp();  
    });
    
    // при скролле исчезает видео и сетка 
    $(window).on('scroll', function() {
      var scrollCoef = 0.003;

      $('video, .opacity').css({
        opacity: 1 - $(window).scrollTop() * scrollCoef
      });

      $('.products, .next-block').css({
        height:  $(window).scrollTop() * 2
      });
      $('.header').css('background', 'rgb(255, 255, 255)');
      if ($(window).scrollTop() == 0) {
        $('.header').css('background', 'rgba(255, 255, 255, 0.9)');
      }


      if ($(window).width() <= '990'){ 
        $('.products').css({
          height:  $(window).scrollTop() * 10
        });
        $('.header-mobile').css({
          'background': '#fff',
          'box-shadow': '0px 5px 5px rgba(0, 0, 0, 0.132586)'
        });
        if ($(window).scrollTop() == 0) {
          $('.header-mobile').css({
            'background': '',
            'box-shadow': ''
          });
        }
      }
    });

    //модалка
    $('.main__btn').on('click', function() {
      $('.overlay, #modal').fadeIn(300);
      $('body').css('overflow', 'hidden');
      if ($(window).width() <= '599'){ 
        $('.header-mobile').css('background', '#fff');
        $('.header-mobile__wr').css({
          'box-shadow': '0px 5px 5px rgba(0, 0, 0, 0.132586)'
        });
      }
    });

    function clearForm() {
      $('form')[0].reset(); 
      $('body').css('overflow', '');
      $('input').val('');  
      $('input').removeClass('success');  
      $('input').removeClass('error');
      $('.err').children('label').remove();
      $('.header-mobile').css('background', '');
      $('.header-mobile__wr').css({
        'box-shadow': ''
      });
    }
  
    $('.modal__close').on('click', function() {
      $('.overlay, #modal, #thanks').fadeOut();
      clearForm();
    });

    // Клик по фону, но не по окну
    $('.overlay').click(function(e) {
      if ($(e.target).closest('#modal').length == 0) {
        $(this).fadeOut();	
        clearForm();
      }
    });
 
    //Закрытие по клавише esc
    $(document).on('keydown', function(e) {
      if (e.keyCode == 27) {
         $('.overlay, #modal, #thanks').fadeOut();
         clearForm();
      }
    });

    //маска номера
    $('input[name=phone]').mask("+7(999)999-9999"); 

    // добавляем правило для валидации телефона
    jQuery.validator.addMethod("checkMaskPhone", function(value, element) {
      return /\+\d{1}\(\d{3}\)\d{3}-\d{4}/g.test(value); 
    });

    //запрет ввода цифр в имя
    $('body').on('input', 'input[name=name]', function(){
      this.value = this.value.replace(/[^a-zа-яё\s]/gi, '');
    });
  
    //валидация формы в модальном окне
    $('.modal__form').validate({
        rules: {
            name: "required",
            checkbox: "required",
            phone: {
              checkMaskPhone: true,
            },
            email: {
                required: true,
                email: true 
            }
        },
        validClass: "success",
        messages: {
            name: "Пожалуйста, введите свое имя",
            checkbox: "Поставьте флажок",
            phone: "Пожалуйста, введите свой номер телефона",
            email: {
              required: "Пожалуйста, введите свою почту",
              email: "Неверно заполнена почта"
            }
        },
        errorPlacement: function (error, element) {
          if (element.attr("type") == "checkbox") {
              return element.next('label').append(error);
          }
            error.insertAfter($(element));

          //расположение элемента ошибки
          
          var placement = $(element).data('error');
          if (placement) {
            $(placement).append(error);
          } else {
            error.insertAfter(element);
          }
        }
    });

    //при потере фокуса проходит проверка
    $('.modal__input').blur(function(){
        if(!$(this).valid()){
            $(this).focus();
            return false;
        }
    });
    
    //активность кнопки
    function checkParams() {
      var email = $('#mail').val();
      var phone = $('#phone').val();
      var name = $('#name').val();
        
      if(email.length != 0 && phone.length != 0 && name.length != 0 && $('#check').is(':checked')) {
          $('.modal__submit').removeAttr('disabled');
          $('.modal__submit').css('opacity', '1');
      } else {
          $('.modal__submit').attr('disabled', 'disabled');
      }
    }
    
    //проверка заполненности инпутов
    $('.modal__input').keyup(function() {
      $(this).valid();
      checkParams();
    });

    //проверка галки
    $('#check').change(function() {
      checkParams();
    });
      
    //если форма отправилась
    $('form').submit(function(e) {
      $(this).find("input").val("");  
      $(this).find("input").removeClass('success'); 
      $('input:checked').prop('checked', false);
      $('.modal__submit').attr('disabled', 'disabled');
      $('.modal__submit').css('opacity', '0.2');
      $(this).find("textarea").val("");
      $('#modal').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');
      $('form').trigger('reset');      
    });

  }); 
    
  
  
  
  
  
$(document).ready(function(){
    //ищем ul, кликаем на li, добавляем класс активности, а у остальных табов убираем. ищем родителя __view находим у него контент, удаляем класс активности и выбираем элемент с индексом как у This и добавляем класс
  
    // $('ul.project__tabs').on('click', 'li:not(.project__tab_active)', function() {
    //   $(this)
    //     .addClass('project__tab_active').siblings().removeClass('project__tab_active')
    //     .closest('div.project__view').find('div.project__content').removeClass('project__content_active').eq($(this).index()).addClass('project__content_active');
    // });
    //modal 

    $('.header').on('mouseenter', '.header__item', function() {
      $(this).find('.header__link').addClass('header__link_active');
      $(this).addClass('header__item_act');
      $(`div[data-id="${$(this).attr('data-id')}"`).fadeIn();
    });


    $('.header').on('mouseleave', '.header__item', function() {
      $(this).find('.header__link').removeClass('header__link_active');
      $(this).removeClass('header__item_act');
      $(`div[data-id="${$(this).attr('data-id')}"`).fadeOut();
    });


    // $('.header').on('mouseleave', '.header__link', function(e) {
    //   console.log(e.target.className);
    //   if(e.target.className == "header__text") {
    //     console.log('hi');
    //     $(`div[data-id="${$(this).attr('data-id')}"`).fadeOut();
    //   }
    //   //$(`div[data-id="${$(this).attr('data-id')}"`).fadeOut();
    //   //$('.header__accordion').fadeOut();
    // });

    // $('.header').on('mouseleave', '.header__item', function() {
    //   $(`div[data-id="${$(this).attr('data-id')}"`).fadeOut();
    //   // $('.header__accordion').fadeOut();
    // });

    //при скролле исчезает видео и сетка 
    $(window).on('scroll', function() {
      var scrollCoef = 0.0035;

      $('.header').css('background', 'rgb(255, 255, 255)');
    
      $('video, .opacity').css({
        opacity: 1 - $(window).scrollTop() * scrollCoef
      });

      $('.products').css({
        height: 300 + $(window).scrollTop() * 2
      });
    });

    //растягивание блока 
    $('.wrapper').css({
      height: $(window).height() + 'px'
    });


    //модалка
    $('.main__btn').on('click', function() {
      $('.overlay, #modal').fadeIn();
      $('body').css('overflow', 'hidden');
    });
  
    $('.modal__close').on('click', function() {
      $('.overlay, #modal, #thanks').fadeOut();
      $('form')[0].reset();  //сбросить значения интуп при закрытии окна
      $('body').css('overflow', '');
    });

    // Клик по фону, но не по окну.
    $('.overlay').click(function(e) {
      if ($(e.target).closest('#modal').length == 0) {
        $(this).fadeOut();	
              $('form')[0].reset();				
      }
    });
 
    //Закрытие по клавише esc
    $(document).on('keydown', function(e) {
      if (e.keyCode == 27)
      $('.overlay, #modal, #thanks').fadeOut();
    });
  
    //валидация формы в модальном окне
  
    $('.modal__form').validate({
        rules: {
            name: "required",
            checkbox: "required",
            phone: "required",
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
              email: "Неправильно введен адрес почты"
            }
        },
        errorPlacement: function (error, element) {
          if (element.attr("type") == "checkbox") {
              return element.next('label').append(error);
          }
      
            error.insertAfter($(element));
        },
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
      checkParams() ;
    });

    //проверка галки
    $('#check').change(function() {
      checkParams();
    });
      
    $('input[name=phone]').mask("+7 (999) 999-99-99"); //маска номера


    $('form').submit(function(e) {
      $(this).find("input").val("");  
      $(this).find("input").removeClass('success'); 
      $('input:checked').prop('checked', false);
      $('.modal__submit').attr('disabled', 'disabled');
      $('.modal__submit').css('opacity', '0.2');
      $(this).find("textarea").val("");
      $('#modal').fadeOut();
      $('#thanks').fadeIn('slow');
      $('form').trigger('reset'); //очищение формы       
    });

  }); 
    
  
  
  
  
  
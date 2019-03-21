$(document).ready(function(){
  $('.campaings-inn-content').scrollbar();
  $('.address-list').scrollbar();
  $('.select-emul-dropdown').scrollbar();

  $('[data-datepicker]').datepicker();

  $('.select_default').SumoSelect();

  $('.container__select_family select').SumoSelect({
    placeholder: 'Семейное положение'
  });

  $('select.select_tags').SumoSelect({
    placeholder: 'Данные и интересы вашей аудитории',
    captionFormat: '{0} выбрано',
    captionFormatAllSelected: '{0} все выбраны!',
  });


  $('.container__age').ionRangeSlider({
    type: "double",
    grid: false,
    min: 18,
    max: 100,
    from: 25,
    to: 100,
    drag_interval: true,
    min_interval: null,
    max_interval: null,
    skin: 'round',
  });

  $('.container__radius').ionRangeSlider({
    grid: false,
    min: 1,
    max: 100000,
    from: 25,
    to: 100000,
    min_interval: null,
    max_interval: null,
    skin: 'round',
  });

  $('.container__years').ionRangeSlider({
    type: "double",
    grid: false,
    min: 1917,
    max: 2017,
    from: 1917,
    to: 1995,
    drag_interval: true,
    min_interval: null,
    max_interval: null,
    skin: 'round',
  });


  $('[data-time]').inputmask('99:99:99');
  $('[data-datepicker]').inputmask('99.99.9999');

  const closeHeaderMenu = function(e) {
    if (!e.target.closest('.header-menu') && !e.target.closest('.header-menu-container')) {
      $('.header-menu').slideUp(300);
    }
  };

  const moveToAnchor = function() {
    let pathname = location.href;

    if (!$('.registration').length) {
      $('body').css('overflow', '');
    }

    if (pathname.indexOf('#') > 0) {
      pathname = pathname.split('#');
      pathname = pathname[(pathname.length - 1)];

      $('html, body').scrollTop(0);
      $('.registration').removeClass('active');
      $('body').css('overflow', '');

      if (!pathname.length) {
        return false;
      }

      let target = $(`#${pathname}`).offset().top - 150;

      $('html, body').animate({scrollTop: target}, 1000);
      return false;
    }
  }

  const headerMenu = function(e) {
  	$(this).find('.header-menu')
  				 .slideToggle(200);
  };

  const headerNav = function() {
  	$(this).addClass('active')
  				 .siblings()
  				 .removeClass('active');
  };

  const mainBlockNav = function() {
  	$(this).addClass('active')
  				 .siblings()
  				 .removeClass('active');
  };

  const inputFocusOn = function() {
    $(this).addClass('active');

  };

  const inputFocusOff = function() {
    if ($(this).find('input').length) {
      if ($(this).find('input').val().length) {
        return false;  
      }
    }
    

    if ($(this).find('textarea').length) {
      if ($(this).find('textarea').val().length) {
        return false;  
      }
    }
    

    $(this).removeClass('active');
  };

  const toLocaleString = function() {
    let oldValue = $(this).val();

    oldValue = oldValue.replace(/\s+/g,'');
    oldValue = parseInt(oldValue);

    $(this).val(oldValue.toLocaleString());
  };

  const changeTabs = function(e) {
    e.preventDefault();
    $(this).addClass('active')
           .siblings()
           .removeClass('active');

    $(this).closest('.main-block')
           .find('.main-block-tabs-item')
           .removeClass('active')
           .eq($(this).index())
           .addClass('active');
  };

  const scrollToBlock = function(e) {
    e.preventDefault();
    let link = $(this).attr('href');
    if (window.location.pathname == '/index.html') {
      if (link.indexOf('#') <= 0) return false;
      
      link = link.split("#");
      link = `#${link[(link.length - 1)]}`;

      if (!$(document).find(`${link}`).length) {
        return false;
      }

      let targetOffset = ($(document).find(`${link}`).offset().top - 150);

      $('header .header-link').css('pointer-events', 'none');
      setTimeout(function() {
        $('header .header-link').css('pointer-events', 'auto');
      },1000);

      $('html, body').animate({scrollTop: targetOffset}, 1000);

      return false;
    } else {
      window.location = `${link}`;
    }
  };

  const removePopup = function(e) {
    e.preventDefault();

    $('body').css('overflow', '');

    $(this).closest('.active')
           .removeClass('active');
  };

  const removeActiveLinks = function() {
    if (window.location.pathname !== '/index.html') {
      $('header .header-link').removeClass('active');
    }
  };

  const activeRadio = function() {
    $(this).closest('.form-input').addClass('active');
  };


  const faqOpenText = function() {
    if($(this).hasClass('active')) {
      $(this).removeClass('active')
             .siblings('.faq-theme-main')
             .slideUp(300);

      return false;
    } else {
      $(this).addClass('active')
             .siblings('.faq-theme-main')
             .slideDown(300);

      return false;
    }
  };

  const faqOpenInnerText = function(e) {
    if (e.target.classList.contains('date-pick-period__link_inline')) {
      window.location = e.target.href;
      return false;
    }

    if($(this).hasClass('active')) {
      $(this).removeClass('active')
             .siblings('.faq-question-main')
             .slideUp(300);

      return false;
    } else {
      $(this).addClass('active')
             .siblings('.faq-question-main')
             .slideDown(300);

      return false;
    }
  };


  const dropdownMenu = function(e) {
    if ($(this).siblings('.select-emul-dropdown').hasClass('active')) {
      $(this).siblings('.select-emul-dropdown')
           .css({
            height: '0px'
           })
           .removeClass('active');
           
    } else {
      $(this).siblings('.select-emul-dropdown')
           .css({
            height: '100px'
           })
           .addClass('active');
    }
  };


  const closeDropdownMenu = function(e) {
    if (e.target !== $('.select-emul-wrapper') && !e.target.closest('.select-emul-wrapper') ) {

      $('.select-emul-dropdown')
           .css({
            height: '0px'
           })
           .removeClass('active');
    }
  };


  const selectGift = function() {
    let textField = $(this).closest('.select-emul-wrapper').find('.select-emul__text');
    let itemCloned = $(this).clone();
    let itemClonedDescr = itemCloned.find('img').data('value');

    textField.html(itemCloned);
    textField.append(` - ${itemClonedDescr}`);

    $('.select-emul-dropdown')
           .css({
            height: '0px'
           })
           .removeClass('active');
  };


  const activeDatepicker = function() {
    $(this).closest('.campaign-datepicker').addClass('active');
  };

  const deactiveDatepicker = function() {
    let wrapper = $(this).closest('.campaign-datepicker');
    let inputs = wrapper.find('input');
    let result = 0;


   inputs.map((index, el) => {
      if (el.value.length > 0){
        ++result;
      }
    });

    if (result > 0) return false;
    wrapper.removeClass('active');
  };


  const openCategory = function() {
    if($(this).hasClass('active')) {
      $(this).siblings('.container-category-main')
             .slideUp(300);
      $(this).removeClass('active');

    } else {
      $(this).siblings('.container-category-main')
             .slideDown(300);
      $(this).addClass('active');

    }
    
  };


  const openCategoryInn = function() {
    if( $(this).hasClass('active') ) {
      $(this).find('input[type="checkbox"]').prop('checked', 0);
      $(this).removeClass('active');
      $(this).siblings('.container-category-inn-main')
             .slideUp(300);
      return false;
    } else {
      $(this).find('input[type="checkbox"]').prop('checked', 1);
      $(this).addClass('active');
      $(this).siblings('.container-category-inn-main')
             .slideDown(300);
      return false;
    }
  };


  const campaignTabs = function(e) {
    e.preventDefault();
    $(this).addClass('active')
           .siblings()
           .removeClass('active');

    $(this).closest('.campaign-spec-window')
           .find('.main-block-tabs-item')
           .removeClass('active')
           .eq($(this).index())
           .addClass('active');
  };


  const getNameOfFile = function() {
    let fileName = this.files[0].name;

    $('.campaign-spec-container_p-file__output').text(fileName);
  }

  removeActiveLinks();
  moveToAnchor();

  $(document).on('click', '.container-category-inn-head', openCategoryInn);
  $(document).on('click', '.container-category-head', openCategory);
  $(document).on('click', '.dropdown-item', selectGift);
  $(document).on('click', closeDropdownMenu);
  $(document).on('click', '.select-emul', dropdownMenu);
  $(document).on('click', '.faq-question-top', faqOpenInnerText);
  $(document).on('click', '.faq-theme-top', faqOpenText);
  $(document).on('click', '.form-input__radio', activeRadio);
  $(document).on('click', '.registration .btn-cancel', removePopup);
  $(document).on('click', 'header .header-link', scrollToBlock);
  $(document).on('click', '.main-block-nav__link', mainBlockNav);
  $(document).on('click', '.header-menu-container', headerMenu);
  $(document).on('click', '.header .header-link:not(active)', headerNav);
  $(document).on('click', '[data-tabs-link]:not(.active)', changeTabs);
  $(document).on('click', closeHeaderMenu);
  $(document).on('click', '.campaign-spec-nav .main-block-nav__link:not(active)', campaignTabs);

  $(document).on('change', '.input-text input', toLocaleString);
  $(document).on('change', '.campaign-spec-container_p-file .block-photo-upload__input', getNameOfFile);

  $(document).on('focus', '.campaign-datepicker input', activeDatepicker);
  $(document).on('focus', '.input-text', inputFocusOn);
  $(document).on('focus', '.form-input', inputFocusOn);

  $(document).on('blur', '.campaign-datepicker input', deactiveDatepicker);
  $(document).on('blur', '.input-text', inputFocusOff);
  $(document).on('blur', '.form-input', inputFocusOff);
  

  if ($('.map').length) {
      function initMap () {
        let map = new google.maps.Map(document.querySelector('.map'), {
          center: new google.maps.LatLng(60.068521, 30.313409),
          zoom: 14,
          streetViewControl: false,
          mapTypeControl: false,
          gestureHandling: 'greedy',
          scrollwheel: false,
          disableDefaultUI: true,
          draggable: false
        });
    }

    initMap();
  }
  

});
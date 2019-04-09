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

  $('[data-address]').kladr({
    oneString: true
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

    $('.registration').removeClass('active');
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


  const testAPICall = function(e) {
    e.preventDefault();
    $.ajax({
      type: 'GET',
      method: 'POST',
      url: 'http://api.auto.ria.com/average',
      data: {
        marka_id: 9,
        model_id: 31887,
        yers: 2014,
        fuel_id: 1,
        fuel_id: 2
      },
      dataType: 'json',
      cache: false,
      contentType: false, // важно - убираем форматирование данных по умолчанию
      processData: false, // важно - убираем преобразование строк по умолчанию
    }).
    done(function(data) {
      alert('Данные отправлены');
      console.log(data);
    }).fail(function() {
      alert('Произошла ошибка');
    });
  };


  const uploadPhoto = function(e) {
    let file = this.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function(e) {
      url = e.target.result;

      $('.block-photo-upload__avatar').css({background: `url(${url}) no-repeat center center`, backgroundSize: 'cover'});
    }
  }


  removeActiveLinks();
  moveToAnchor();


  $(document).on('change', '.block-photo-upload__input', uploadPhoto);
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


//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------
//----------------------------------------------API-------------------------------------------------------------




  let rowCampaingTemplate = $('.campaings-inn-row.campaings-item').clone();
  let baseURL = 'http://getlucky.city/api';

  String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
  };

  const uuid = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15 >> c/4).toString(16));
  let id = 0;
  let key = '';

  $(document).on('click', '[data-giftsbackpack-active]', function() {
    $.ajax({
      url: `${baseURL}/gift/b/${id}/${key}`,
      type: 'GET',
      dataType: 'json',
    })
    .done(function(response) {
      let values = response.value;
      values.each(function() {
        rowCampaingTemplate.find('.campaings-item-img img').attr('src', `img/icons/${this.userGift.userGiftImageID}`);
        rowCampaingTemplate.find('.campaings-item-info__name').text(this.userGift.userGiftName);
        rowCampaingTemplate.find('.campaings-item-info__period').text(`${this.userGift.userGiftUsedDate} - ${this.userGift.userGiftExpirationDate}`);
        rowCampaingTemplate.find('.campaings-item-info__count').text(this.userGift.userGiftText);
        rowCampaingTemplate.attr('data-campaing-id', userGiftID);
        $('.campaings-inn').append(rowCampaingTemplate.clone());
      });
      console.log("success");
    })
    .fail(function(error) {
      console.log(error);
    })
  });


  $(document).on('click', '#btn-create-profile', function(e) {
    e.preventDefault();
    let data = {};
    let date = new Date();
    let key = `${$('[data-org-login]').val()}${$('[data-org-password]')}`;

    let avatar = $('.block-photo-upload__avatar').attr('style');


    if (avatar) {
      avatar = avatar.split(' ');
      avatar = avatar[1].split('"');
      avatar = avatar[1];
    } else {
      avatar = 0;
    }
    

    key = key.hashCode();

    data.user = {};
    data.user.device = {};
    data.user.user = {};
    data.user.location =[];
    data.org = {};

    id = `${date.getTime()}`;

    data.org.orgName = `${$('[data-org-name]').val()}`;
    data.org.orgFullName = `${$('[data-org-type]').val()}`;
    data.org.orgTIN = `${$('[data-org-inn]').val()}`;
    data.org.orgOGRN = `${$('[data-org-ogrn]').val()}`;
    data.user.user.userName = `${$('[data-org-login]').val()}`;
    data.user.user.userKey = `${key}`;
    data.org.orgPhone = `${$('[data-org-phone]').val()}`;
    data.user.user.userEmail = `${$('[data-org-email]').val()}`;
    data.user.user.userName = `${$('[data-org-address-addr]').val()}`;
    data.org.orgLogo = `${avatar}`;
    data.addresses = [{
      addressValue: `${$('[data-org-address-city]').val()}`,
      addressLocality: `${$('[data-org-address-addr]').val()}`,
    }]
    data.user.user.userID = id;
    
    console.log(data);
    

    $.ajax({
      url: `${baseURL}/org/create`,
      method: 'POST',
      type: 'POST',
      dataType: 'json',
      data: data,
    })
    .done(function(response) {
      removePopup(e);
      console.log('success');
    })
    .fail(function(error) {
      console.log('error');
    });

  });

});
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


  $('[data-org-phone], [data-edit-phone], [data-callback-phone]').inputmask({
    mask: "+7 (999) 999-99-99",
    showMaskOnHover: false,
    showMaskOnFocus: true
  });
  $('[data-org-email], [data-support-email], [data-callback-email]').inputmask({ 
    alias: "email",
    showMaskOnHover: false,
    showMaskOnFocus: true
  });
  $('[data-org-inn], [data-edit-inn]').inputmask({ 
    mask: "9999999999",
    showMaskOnHover: false,
    showMaskOnFocus: true
  });
  $('[data-org-ogrn], [data-edit-ogrn]').inputmask({ 
    mask: "9999999999999",
    showMaskOnHover: false,
    showMaskOnFocus: true
  });

  const showModal = function(idModal, text) {
    console.log($('#' + idModal));
    $('#' + idModal).attr('style', 'display:flex');
    $('#' + idModal).find('.send-success-content').text(text);
    setTimeout(function() { $('#' + idModal).fadeOut() }, 3000);
  };

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

  const removePopup = function() {
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
  };


  const uploadScreenShot = function() {
    console.log(this.files);
    let file = this.files;

    for (let i = 0; i < this.files.length; i++) {
      $('.form-input__upload_result').append(`<div>${this.files[i].name}</div>`)
    }
    
  };

  const linkForm = function(e) {
    e.preventDefault();

    $('a.header-link.main-block-nav__link').removeClass('active').eq(0).addClass('active');
    $('a.header-link.main-block-nav__link').removeClass('active').eq(0).addClass('active');

    $('.main-block-content.main-block-tabs-item.main-block-content_card').removeClass('active').eq(0).addClass('active');
  };

  const addAddressMap = function() {

  };

  removeActiveLinks();
  moveToAnchor();

  $(document).on('click', '[data-form-back]', linkForm);
  $(document).on('change', '.form-input__upload input[type="file"]', uploadScreenShot);
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

  // let baseURL = 'https://getlucky.city/api';
  let baseURL = 'http://185.162.92.149:8080/api';

  const uuid = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15 >> c/4).toString(16));
  
  let id, authKey, orgID;

  let rowTable = $('.row-template').clone();
  $('.row-template').remove();

  let campaingItem = $('.campaings-inn-row.campaings-item').clone();
  $('.campaings-inn-row.campaings-item').remove();


  //ПОЛУЧЕНИЕ ИНФОРМАЦИИ О БИЗНЕС ПРОФИЛЕ

  var getInfoBuisnessProfile = function() {

    $.ajax({
      url: `${baseURL}/org/${id}/${authKey}`,
      type: 'GET',
      method: 'GET',
      dataType: 'json',
    })
    .done(function(response) {
      let orgmoney = response.value.orgMoney || 0;
      $(document).find('.balance-text span').text(orgmoney);

      if (response.value.orgLogo) {
        $(document).find('.header-avatar img').attr('src', response.value.orgLogo);
      }


      $(document).find('.balance-text span').text(response.value.orgMoney);

      console.log("get info about buisness profile");
    })
    .fail(function() {
      console.log("can't get info about buisness profile");
    })
  }

  //КОНЕЦ ПОЛУЧЕНИЕ ИНФОРМАЦИИ О БИЗНЕС ПРОФИЛЕ

  //ПОЛУЧЕНИЕ СТАТИСТИКИ КАМПАНИИ  
  var getStatisticCampaings = function() {
    $('.table-statistic').html('');

    let startDate, endDate;

    if ($('[data-date-start]').val()) {
      startDate = '01.01.2019';
      $('[data-date-start]').val(startDate);
    } else {
      startDate = $('[data-date-start]').val();
    }

    if ($('[data-date-end]').val()) {
      endDate = '01.12.2019';
      $('[data-date-end]').val(endDate);
    } else {
      endDate = $('[data-date-end]').val();
    }

    $.ajax({
      url: `${baseURL}/gift/${id}${authKey}/stats`,
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      data:{
        start: startDate,
        end: endDate,
      }
    })
    .done(function(response) {

      let gift = response.value;

      if (gift) {
        gift.forEach(function(item, i) {
          let row = rowTable.clone();
          row.find('td').eq(0).text(item.giftName);
          row.find('td').eq(1).text(item.giftConversion);
          row.find('td').eq(2).text(item.giftType);
          row.find('td').eq(3).text(item.giftDate);
          row.find('td').eq(4).text(item.giftMoney);
          row.find('td').eq(5).text(item.giftReleased);
          row.find('td').eq(6).text(item.giftCollected);
          row.find('td').eq(7).text(item.giftDistributed);
          row.find('td').eq(8).text(item.giftCost);
          row.find('td').eq(9).text(item.giftVisitorCost);
          $('.table-statistic').append(row);
        });
      }
      console.log("gift statistic added");
    })
    .fail(function() {
      console.log("gift statistic failed");
    })
    
  };
  $(document).on('change', '[data-date-start]', getStatisticCampaings);
  $(document).on('change', '[data-date-end]', getStatisticCampaings);
  //КОНЕЦ ПОЛУЧЕНИЕ СТАТИСТИКИ КАМПАНИИ

  //ПОЛУЧЕНИЕ СПИСКА КАМПАНИИ
  var getListCampaings = function() {
    console.log(`${baseURL}/gift/${id}/${authKey}`);

    $.ajax({
      url: `${baseURL}/gift/${id}/${authKey}`,
      type: 'GET',
      dataType: 'json',
    })
    .done(function(response) {

      let gifts = response.value;

      if (gifts) {
        gifts.forEach(function(item, i) {
          $('[data-giftsbackpack-active]').find('.campaings-inn-row.campaings-item').remove();
          $('[data-giftsbackpack-moderating]').find('.campaings-inn-row.campaings-item').remove();
          $('[data-giftsbackpack-finished]').find('.campaings-inn-row.campaings-item').remove();

          let campaingRow = campaingItem.clone();

          campaingRow.attr('data-gift-id', item.Gift.giftID);
          campaingRow.find('.campaings-item-info__name').text(item.Gift.giftName);
          campaingRow.find('.campaings-item-info__period').text(`${item.Gift.giftDateCreation} - ${item.Gift.giftDateUserEnd}`);
          campaingRow.find('.campaings-item-info__count').text(item.locations.giftCount);
          if (item.Gift.giftStatus == 'in_progress') {
            $('[data-giftsbackpack-active]').find('.campaings-inn').append(campaingRow);
          }
          if (item.Gift.giftStatus == 'available') {
            $('[data-giftsbackpack-moderating]').find('.campaings-inn').append(campaingRow);
          }
          if (item.Gift.giftStatus == 'not_available') {
            $('[data-giftsbackpack-finished]').find('.campaings-inn').append(campaingRow);
          }
        });
      }
      console.log("gift list added");
    })
    .fail(function(error) {
      console.log(error);
      console.log("gift list failed");
    })
    
  };
  //КОНЕЦ ПОЛУЧЕНИЕ СПИСКА КАМПАНИИ

  //ПОЛУЧЕНИЕ СПИСКА АДРЕСОВ

  var getAddresses = function() {
    $.ajax({
      url: `${baseURL}/org/${id}/${authKey}/address`,
      type: 'GET',
      dataType: 'json',
    })
    .done(function(response) {
      console.log(response);
      $('.address-list.scroll-content').html('');
      response.value.forEach(function(item, i) {
        console.log(item);
        let city = item.addressValue;
        let addr = item.addressLocality;
        let addrID = item.addressID;

        if (city && addr) {
          let temp = addressTemplate.clone();

          temp.attr('data-addr-id', addrID);

          temp.find('.address-list-item__name').find('.address-list-item__name--city').text(`${city}`);
          temp.find('.address-list-item__name').find('.address-list-item__name--addr').text(`${addr}`);
          

          $('.address-list.scroll-content').append(temp);
        }
      });
      console.log("success get of info of buisness profile");
    })
    .fail(function() {
      console.log("error get of info of buisness profile");
    })
  }

   //КОНЕЦ ПОЛУЧЕНИЕ СПИСКА АДРЕСОВ

   //ПЕРВОНАЧАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ ПРИ НАЛИЧИИ ТОКЕНА И ID

  if (localStorage["id"] && localStorage["authKey"]) {
    id = localStorage["id"];
    authKey = localStorage["authKey"];
    orgID = localStorage["orgID"];
    removePopup();
    getInfoBuisnessProfile();
    getStatisticCampaings();
    getListCampaings();
  } else {
    id = 0;
    authKey = '';
    orgID = 0;
  }

  //КОНЕЦ ПЕРВОНАЧАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ ПРИ НАЛИЧИИ ТОКЕНА И ID

  //СОЗДАНИЕ БИЗНЕС ПРОФИЛЯ

  $(document).on('click', '#btn-create-profile', function(e) {
    e.preventDefault();

    if ($('.block-form input').val() == "" || !$('[data-org-phone], [data-org-email], [data-org-inn], [data-org-ogrn]').inputmask("isComplete")) {
      $('.block-btns-wrap span').attr('style', 'visibility:initial');
      showModal($('#send-error').attr('id'));
      return false;
    }
    showModal($('#send-success').attr('id'));

    let data = {};
    let avatar = $('.block-photo-upload__avatar').attr('style');


    if (avatar) {
      avatar = avatar.split(' ');
      avatar = avatar[1].split('"');
      avatar = avatar[1];

      let avatarImg = new FormData();
      let avatarImage = $('.block-photo-upload__input')[0].files[0];
      avatarImg.append('file', avatarImage);
      avatarImg.append('type', 0);
      avatarImg.append('category', 'banner');


      $.ajax({
        url: `${baseURL}/image/upload`,
        method: 'POST',
        dataType: 'json',
        contentType: 'multipart/form-data',
        processData: false,
        data: avatarImg,
      })
      .done(function() {
        console.log("avatar uploaded");
      })
      .fail(function(error) {
        console.log(error);
        console.log("avatar not uploaded");
      })    
    } else {
      avatar = 0;
    }

    data = {
      "user": {
        "userName": `${$('[data-org-login]').val()}`,
        "userKey": `${$('[data-org-password]').val()}`,
        "userEmail": `${$('[data-org-email]').val()}`
      },
      "org": {
        "orgName": `${$('[data-org-name]').val()}`,
        "orgFullName": `${$('[data-org-type]').val()}`,
        "orgBanner": 0,
        "orgLogo": 0,
        "orgTIN": `${$('[data-org-inn]').val()}`,
        "orgOGRN": `${$('[data-org-ogrn]').val()}`,
        "orgPhone": `${$('[data-org-phone]').val()}`
      },
      "addresses": [
        {
          "addressValue": `${$('[data-org-address-city]').val()}`,
          "addressLocality": `${$('[data-org-address-addr]').val()}`
        }
      ]
    }
    console.log(data);
    console.log(typeof(data));
    console.log(`${baseURL}/org/create`);

    $.ajax({
      url: `${baseURL}/org/create`,
      method: 'POST',
      contentType: 'application/json',
      crossDomain: true,
      processData: false,
      data: JSON.stringify(data),
    })
    .done(function(response) {

      id = response.value.userID;
      authKey = response.value.userKey;
      orgID = response.value.orgID;

      localStorage["id"] = id;
      localStorage["authKey"] = authKey;
      localStorage["orgID"] = orgID;

      removePopup(e);
      getInfoBuisnessProfile();
      getStatisticCampaings();
      getListCampaings();
      console.log('buisness profile registered');
    })
    .fail(function(error) {
      console.log('buisness profile register failed');
    });

  });

  //КОНЕЦ СОЗДАНИЯ БИЗНЕС ПРОФИЛЯ


  

  let addressTemplate = $('[data-edit-address]').clone();
  $('[data-edit-address]').remove();

  //РЕДАКТИРОВАНИЕ ПРОФИЛЯ

  $(document).on('click', '[data-edit-add-addr-btn]', function(e) {
    e.preventDefault();
    let city = $('[data-edit-add-city]').val();
    let addr = $('[data-edit-add-addr]').val();
    let data = [
      {
        "addressValue": `${city}`,
        "addressLocality": `${addr}`
      }
    ]

    $.ajax({
      url: `${baseURL}/org/${id}/${authKey}/address`,
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data),
    })
    .done(function() {
      getAddresses();
      console.log("successfull added new address");
    })
    .fail(function() {
      console.log("error adding new address");
    })
    
  });

  $(document).on('click', '.address-list-item__btn', function(e) {
    e.preventDefault();

    let tempItem = $(this).closest('[data-edit-address]');

    $.ajax({
      url: `${baseURL}/org/${id}/${authKey}/address`,
      type: 'DELETE',
      dataType: 'json',
      data: {
        locality: $(this).closest('[data-edit-address]').attr('data-addr-id')
      },
    })
    .done(function() {
      tempItem.remove();
      console.log("successfull deleted item");
    })
    .fail(function() {
      console.log("error of delete of item");
    })
    
  });

  $(document).on('click', '[data-edit-save]', function(e) {
    e.preventDefault();

    if ($('.form-input input').val() == "" || !$('[data-edit-phone], [data-edit-inn], [data-edit-ogrn]').inputmask("isComplete")) {
      $('.block-btns-wrap span').attr('style', 'visibility:initial');
      showModal($('#send-error').attr('id'), 'Ошибка изменения');
      return false;
    }
    

    let data = {};

    let editName = $('[data-edit-name]').val();
    let editFullname = $('[data-edit-type]').val();
    let editTin = $('[data-edit-inn]').val();
    let editOgrn = $('[data-edit-ogrn]').val();
    let editPhone = $('[data-edit-phone]').val();
    data.addresses = [
      {
        addressValue: $('[data-edit-address-city]').val(),
        addressLocality: $('[data-edit-address-addr]').val(),
      }
    ];
    console.log(JSON.stringify(data));
    $.ajax({
      url: `${baseURL}/org/${id}/${authKey}?name=${editName}&fullname=${editFullname}&tin=${editTin}&ogrn=${editOgrn}&phone=${editPhone}`,
      method: 'PUT',
      dataType: 'json',
      contentType: 'application/json',
      processData: true,
      data: JSON.stringify(data),
    })
    .done(function(response) {
      console.log(response);
      console.log("edit profile success");
      showModal($('#send-success').attr('id'), 'Изменения сохранены');
    })
    .fail(function(error) {
      console.log(error);
      showModal($('#send-error').attr('id'), 'Ошибка изменения');
      console.log("edit profile error");
    })
  });

  if (window.location.href.indexOf('edit') > 1) {
    console.log('ПОЛУЧНИЕ ИНФОРМАЦИИ О ПРОФИЛЕ');
    $.ajax({
      url: `${baseURL}/org/${id}/${authKey}`,
      type: 'GET',
      dataType: 'json',
    })
    .done(function(response) {
      $('[data-edit-name]').val(response.value.orgName);
      $('[data-edit-type]').val(response.value.orgFullName);
      $('[data-edit-inn]').val(response.value.orgTIN);
      $('[data-edit-ogrn]').val(response.value.orgOGRN);
      $('[data-edit-phone]').val(response.value.orgPhone);
      $('[data-edit-addresses]').val(response.value.orgAddress);
      console.log("success get of info of buisness profile");
    })
    .fail(function() {
      console.log("error get of info of buisness profile");
    })

    getAddresses();
  }

  //КОНЕЦ РЕДАКТИРОВАНИЕ ПРОФИЛЯ

  // $.ajax({
  //   url: `${baseURL}/images`,
  //   type: 'GET',
  //   dataType: 'json',
  //   data: {id: '1'},
  // })
  // .done(function() {
  //   console.log("success");
  // })
  // .fail(function() {
  //   console.log("error");
  // })
  

});
$(document).ready(function(){
  $('.campaings-inn-content').scrollbar();
  $('.address-list').scrollbar();

  const closeHeaderMenu = function(e) {
    if (!e.target.closest('.header-menu') && !e.target.closest('.header-menu-container')) {
      $('.header-menu').slideUp(300);
    }
  };

  const moveToAnchor = function() {
    let pathname = location.href;

    if (pathname.indexOf('#') > 0) {
      pathname = pathname.split('#');
      pathname = pathname[(pathname.length - 1)];

      $('html, body').scrollTop(0);
      $('.registration').removeClass('active');
      $('body').css('overflow', '');

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

  removeActiveLinks();
  moveToAnchor();

  $(document).on('click', '.form-input__radio', activeRadio);
  $(document).on('click', '.registration .btn-cancel', removePopup);
  $(document).on('click', 'header .header-link', scrollToBlock);
  $(document).on('click', '.main-block-nav__link', mainBlockNav);
  $(document).on('click', '.header-menu-container', headerMenu);
  $(document).on('click', '.header .header-link:not(active)', headerNav);
  $(document).on('click', '[data-tabs-link]:not(.active)', changeTabs);
  $(document).on('click', closeHeaderMenu);
  $(document).on('change', '.input-text input', toLocaleString);
  $(document).on('focus', '.input-text', inputFocusOn);
  $(document).on('focus', '.form-input', inputFocusOn);
  $(document).on('blur', '.input-text', inputFocusOff);
  $(document).on('blur', '.form-input', inputFocusOff);
  


});
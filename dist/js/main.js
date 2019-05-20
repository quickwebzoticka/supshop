$(document).ready(() => {
  let windowWidth = window.innerWidth;

  if (windowWidth >= 1024) {
    let windowOffsetTop = [];
    $(window).scroll(function() {
      windowOffsetTop.push($(window).scrollTop());

      if (windowOffsetTop.length === 2) {
        windowOffsetTop[0] > windowOffsetTop[1] ? $('.header').removeClass('closed') : $('.header').addClass('closed')
        windowOffsetTop = [];
      }
    });
  }

  
  const mobRebuild = () => {
      if (windowWidth < 1024) {
        if ($('.mob-city').html()) {
          return false;
        }
      const city = $('[data-mob="city"]').clone();
      const callback = $('[data-mob="callback"]').clone();
      const customers = $('[data-mob="customers"]').clone();
      const navBar = $('[data-mob="nav-bar"]').clone();
      const chooseBtn = $('[data-mob="choose-btn"]').clone();
      const lk = $('[data-mob="lk"]').clone();
      const like = $('[data-mob="like"]').clone();
      
      $('[data-mob="city"]').remove();
      $('[data-mob="callback"]').remove();
      $('[data-mob="customers"]').remove();
      $('[data-mob="nav-bar"]').remove();
      $('[data-mob="choose-btn"]').remove();
      $('[data-mob="lk"]').remove();
      $('[data-mob="like"]').remove();

      $('.mob-city').append(city);
      $('.mob-nav').append(navBar);
      $('.mob-lk').append(lk);
      $('.mob-lk').append(like);
      $('.mob-callback').append(callback);
      $('.mob-choose-btn').append(chooseBtn);
      $('.mob-customers').append(customers);
      $('.mob-city').append(city);
    }
  }
  mobRebuild();

  //todo: loop for aos animation delay on catalog-output-items

  AOS.init({
    once: true
  });

  $('select').SumoSelect();

  if ($('.lk-message-gallery').length) {
    $('.lk-message-gallery').find('.feedback-slider').slick({
      arrows: false,
      infinite: false,
      speed: 300,
      slidesToShow: 2,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 1366,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  } else {
    $('.feedback-slider').slick({
      arrows: false,
      infinite: false,
      speed: 300,
      slidesToShow: 2,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }


  $('.card-gallery-mini').slick({
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    asNavFor: '.card-gallery-big',
    draggable: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          vertical: false,
          slidesToShow: 3,
          slidesToScroll: 1
        }        
      },
      {
        breakpoint: 525,
        settings: {
          vertical: false,
          slidesToShow: 2,
          slidesToScroll: 1
        }        
      }      
    ]
  });

  $('.card-gallery-big').slick({
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    asNavFor: '.card-gallery-mini'    
  })

  if (windowWidth < 768) {
    $('.news-content .content-row').slick({
      arrows: false,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
    });
  }

  $(document).on('click', '.news-slider-arrows__prev', function() {
    $('.news-content .content-row').slick('slickPrev');
  });

  $(document).on('click', '.news-slider-arrows__next', function() {
    $('.news-content .content-row').slick('slickNext');
  });
  

  $(document).on('click', '.feedback-slider-arrow__prev', function() {
    $('.feedback-slider').slick('slickPrev');
  });

  $(document).on('click', '.feedback-slider-arrow__next', function() {
    $('.feedback-slider').slick('slickNext');
  });

  $(document).on('click', '.burger-menu', function() {
    $(this).toggleClass('active');
    $(this).hasClass('active') ? $('.header-mob').slideDown(300) : $('.header-mob').slideUp(300)
    $(this).hasClass('active') ? $('html, body').css('overflow', 'hidden') : $('html, body').css('overflow', 'auto') 
  });

  $(document).on('click', '.popular-item-img__like', function() {
    $(this).toggleClass('active');
    $(this).find('img').attr('src') == 'img/icons/like.png' ? $(this).find('img').attr('src', 'img/icons/liked.svg') : $(this).find('img').attr('src', 'img/icons/like.png')
  });

  if (windowWidth >= 1024 ) {
    let height = $('header').height();
    $(document).find('.header-bottom-menu-dropdown').css('top', height);
  }
  
  $(document).on('change', '.catalog-row-label input[type="checkbox"]', function() {
    this.checked ? this.parentNode.classList.add('active') : this.parentNode.classList.remove('active')
  });

  $(document).on('click', '.catalog-color-item:not(.active)', function() {
    $(this).addClass('active').siblings('.catalog-color-item').removeClass('active');
  });

  $(document).on('click', '.catalog-size-item', function() {
    let index = $(this).closest('.catalog-size-row').data('choose-size');
    let indexItem = $(this).index();

    $('.catalog-size-item').each(function() {
      $(this).removeClass('active');
    });

    $(this).addClass('active');

    if (index === 1) {
      $('[data-choose-size="0"]').find('.catalog-size-item').eq(indexItem).addClass('active');
    } else {
      $('[data-choose-size="1"]').find('.catalog-size-item').eq(indexItem).addClass('active');
    }
  });

  if ($(document).find('.catalog-filter').length) {
    if (windowWidth > 950) {
      let filterOffsetTop = $(document).find('.catalog-filter').offset().top;
      let filterWidth = $(document).find('.catalog-filter').innerWidth();
      let filterHeight = $(document).find('.catalog-filter').innerHeight();
      let catalogOutputOffsetLeft = $(document).find('.catalog-results').offset().left;
      let resultsHeight = $(document).find('.catalog-results').innerHeight();
  
      $(window).resize(function() {
        catalogOutputOffsetLeft = $(document).find('.catalog-results').offset().left;
        return catalogOutputOffsetLeft;
      });
  
      $(window).on('scroll', function() {
        let scroll = $(window).scrollTop();
        
        if (scroll >= filterOffsetTop) {
          $('.catalog-filter').css({
            position: 'fixed',
            top: 0,
            left: (catalogOutputOffsetLeft - filterWidth - 20),
            overflowY: 'scroll',
            height: '100vh'
          });
        }
        if (scroll < filterOffsetTop) {
          $('.catalog-filter').css({
            position: 'absolute',
            bottom: 'unset',
            top: 0,
            left: 0,
            overflowY: 'auto',
            height: 'auto'
          })
        }
        if (scroll >= (filterOffsetTop + resultsHeight - filterHeight)) {
          $('.catalog-filter').css({
            position: 'absolute',
            bottom: 0,
            top: 'unset',
            left: 0,
            overflowY: 'auto',
            height: 'auto'
          })
        }
      });
    }
    
  }
  $(document).on('click', '.card-tab:not(.active)', function() {
    $(this).addClass('active').siblings().removeClass('active');

    $('.card-tabs-content-item').removeClass('active').eq($(this).index()).addClass('active');
  });


  $(document).on('click', '.video-play-btn', function() {
    $(this).animate({opacity: 0}, 1000, function() {
      $(this).css('display', 'none');
    });
    $('.video')[0].play();
  });


  $(document).on('click', '[data-cart-btn]', function(e) {
    e.preventDefault();
    $('.cart-block').css('display', 'block');
    $('.cart-overlay').css('display', 'block');
    $('.cart-main').css('display', 'block');
    $('html, body').css('overflow', 'hidden');

    setTimeout(function() {
      $('.cart-overlay').css('opacity', 1);
      $('.cart-main').css('opacity', 1).css('transform', 'translateX(0%)');
    },0);
  });

  var closeCart = function() {
    $(this).css({pointerEvents: 'none'});
    $('.cart-overlay').css({opacity: 0});
    $('.cart-main').css({opacity: 0, transform: 'translateX(100%)'});
    setTimeout(() => {
      $('.cart-overlay').css({display: 'none'});
      $('.cart-block').css('display', 'none');
      $('.cart-main').css({display: 'none'});
      $('html, body').css('overflow', 'auto');
      $(this).css({pointerEvents: 'auto'});
    },400);
  }

  $(document).on('click', '.cart-main-close', closeCart);
  $(document).on('click', '.cart-overlay', closeCart);
  $(document).on('click', '.catalog-row-tags-item', function(event) {
    event.preventDefault();
    if($(this).hasClass('disabled')) {
      return 0;
    }
    if($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).addClass('active');
    }       
  });

  $(document).on('click', '.check-tabs-nav-item:not(.active)', function() {
    $(this).addClass('active').siblings().removeClass('active');

    $('.check-tabs-content-item').removeClass('active').eq($(this).index()).addClass('active');
  });

  $(document).on('click', '.lk-main-item-btn', function() {
    let parentNode = $(this).closest('.lk-main-item');

    if (parentNode.hasClass('opened')) {
      if ($(this).data('btn-text') == "normal") {
        $(this).text('Подробнее');
      }
      if ($(this).data('btn-text') == "diff") {
        $(this).text('Развернуть');
      }
      if ($(this).closest('.lk-main-item[data-item-blue]')) {
        $(this).closest('.lk-main-item[data-item-blue]').addClass('lk-main-item_blue')
      }

      $(this).closest('.lk-main-item')
            .removeClass('opened')
            .find('.lk-main-item-content')
            .hide();
    } else {
      if ($(this).closest('.lk-main-item[data-item-blue]')) {
        $(this).closest('.lk-main-item[data-item-blue]').removeClass('lk-main-item_blue')
      }
      $(this).text('Скрыть')
            .closest('.lk-main-item')
            .addClass('opened')
            .find('.lk-main-item-content')
            .show();
    }
  });

  var windowPath = window.location.href;

  if (windowPath.indexOf('lk.html') > 0) {
    console.log(`current page: ${window.location.href}`);
    $(document).find('.lk-sidebar-main-ul-li')
              .eq(0)
              .addClass('active');
  }
  if (windowPath.indexOf('lk-orders.html') > 0) {
    console.log(`current page: ${window.location.href}`);
    $(document).find('.lk-sidebar-main-ul-li')
              .eq(1)
              .addClass('active');
  }
  if (windowPath.indexOf('lk-message.html') > 0) {
    console.log(`current page: ${window.location.href}`);
    $(document).find('.lk-sidebar-main-ul-li')
              .eq(3)
              .addClass('active');
  }

  $(document).on('click', '.lk-sidebar-btn', function() {
    $(this).closest('.lk-sidebar').toggleClass('closed');
  });

  $(document).on('click', '.catalog-filter-btn', function() {
    $(this).closest('.catalog-filter').toggleClass('closed');
  });
});


//-------------------------------------------------------------NEWSNEWPROMO------------------------------------------------
//-------------------------------------------------------------NEWSNEWPROMO------------------------------------------------
//-------------------------------------------------------------NEWSNEWPROMO------------------------------------------------
//-------------------------------------------------------------NEWSNEWPROMO------------------------------------------------
//-------------------------------------------------------------NEWSNEWPROMO------------------------------------------------
//-------------------------------------------------------------NEWSNEWPROMO------------------------------------------------
//-------------------------------------------------------------NEWSNEWPROMO------------------------------------------------
//-------------------------------------------------------------NEWSNEWPROMO------------------------------------------------
//-------------------------------------------------------------NEWSNEWPROMO------------------------------------------------
//-------------------------------------------------------------NEWSNEWPROMO------------------------------------------------
//-------------------------------------------------------------NEWSNEWPROMO------------------------------------------------
$(document).ready(function() {
  $(document).on('click', '.desk-page-tab-buttons button', function() {
    var tabButton = $(this);
    var indexOfTab = tabButton.index();
    var tabContent = $(document).find('.desk-page-tab-content .tab').eq(indexOfTab);
    if(tabContent.hasClass('active')) {

    } else {
      $(document).find('.desk-page-tab-content .tab').each(function() {
        $(this).removeClass('active');
      });
      $(document).find('.desk-page-tab-buttons button').each(function() {
        $(this).removeClass('active');
      });
      tabContent.addClass('active');
      tabButton.addClass('active');
    }
  });
  $('.goodsSlider').slick({
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1060,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
  
        {
        breakpoint: 920,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
  
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  
    $('.timerSlider').slick({
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  $(document).on('click', '.feedback-slider-arrow__prev.promo-header-slider__btn', function() {
    $('.timerSlider').slick('slickPrev');
  });
  
  $(document).on('click', '.feedback-slider-arrow__next.promo-header-slider__btn', function() {
    $('.timerSlider').slick('slickNext');
  });
  $(document).on('click', '.feedback-slider-arrow__prev.promo-footer-slider__btn', function() {
    $('.goodsSlider').slick('slickPrev');
  });
  
  $(document).on('click', '.feedback-slider-arrow__next.promo-footer-slider__btn', function() {
    $('.goodsSlider').slick('slickNext');
  });  
  // Set the date we're counting down to
  var progressBar = document.getElementById('progressBar');
  if(progressBar) {
  console.log(1);
  
  //countDownDate ---- date timer expires
  //dateOfStart ------ actual date u are setting this timer
  var countDownDate = new Date("May 30, 2019 02:30:25").getTime();
  var dateOfStart = new Date("May 16, 2019 02:20:25").getTime();
  var ProgressNow = new Date().getTime();
  var hundredPerc = countDownDate - dateOfStart;
  var progressDistance = countDownDate - ProgressNow;
  var progressWidthNum = ((progressDistance*100)/hundredPerc);
  var progressWidth = progressWidthNum + '%';
  
  progressBar.style.width = progressWidth;
  
  if (progressWidthNum < 0) {
    progressBar.style.width = 0 + '%';
  }
  
  
  // Update the count down every 1 second
  var x = setInterval(function() {
  
    // Get today's date and time
    var now = new Date().getTime();
  
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
  
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    // Output the result in an element with id="demo"
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
  
    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("days").innerHTML = '0';
      document.getElementById("hours").innerHTML = '0';
      document.getElementById("minutes").innerHTML = '0';
      document.getElementById("seconds").innerHTML = '0';
    }
  }, 1000); 

}
});
$(document).ready(() => {
  console.log('DOM structured');

  let windowWidth = window.innerWidth;  
  
  const mobRebuild = () => {
      if (windowWidth < 1024) {
        if ($('.mob-city').html()) {
          return false;
        }
      console.log(1);
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

  AOS.init({
    once: true
  });

  $('select').SumoSelect();

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


  $(document).on('click', '[data-cart-btn]', function() {
    $('.cart-block').css('display', 'block');
    $('.cart-overlay').css('display', 'block');
    $('.cart-main').css('display', 'block');
    $('html, body').css('overflow', 'hidden');

    setTimeout(function() {
      $('.cart-overlay').css('opacity', 1);
    },0);

    setTimeout(function() {
      $('.cart-main').css('opacity', 1).css('transform', 'translateX(0%)');
    }, 0);
  });

  $(document).on('click', '.cart-main-close', function() {

  });
})
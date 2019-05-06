document.addEventListener('DOMContentLoaded', () => {
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
  
})
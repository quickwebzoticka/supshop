document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM structured');
  console.log(this);

  $('select').SumoSelect();

  $('.feedback-slider').slick({
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
})
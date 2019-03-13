$(document).ready(function(){
  const ps = new PerfectScrollbar('.campaings-inn');

  const headerMenu = function() {
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

  $(document).on('click', '.main-block-nav__link', mainBlockNav);
  $(document).on('click', '.header-menu-container', headerMenu);
  $(document).on('click', '.header .header-link:not(active)', headerNav);
})
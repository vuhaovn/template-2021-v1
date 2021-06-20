(function($) {
  function init() {
    accordition();
    hambugerMenu();
  }

  function accordition() {

  }

  function hambugerMenu() {
    $('.hambuger').on('click', function(event) {
      event.preventDefault();
      $(this).toggleClass('clicked');
      $('nav').toggleClass('open');
    });
  }

  // init
  init();
}(jQuery));
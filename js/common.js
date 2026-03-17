$(function(){
  //네비게이션
$('nav ul.gnb').hover(
    function() {
      $('ul.sub, .headerDim').stop().slideDown();
    }, 
    function() {
      $('ul.sub, .headerDim').stop().slideUp();
    }
  );

  //main_visual
  $('.main_visual ul li:gt(0)').hide();
  setInterval(function () {
    $('.main_visual ul li').first().fadeOut().next().fadeIn().end().appendTo('.main_visual ul');
  },16000)


});
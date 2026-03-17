$(function(){
  //네비게이션
  $('nav ul.gnb>li').hover(function(){
    $('ul.sub').stop().slideDown();
  }, function(){
    $('ul.sub').stop().slideUp();
  });

  //main_visual
  $('.main_visual ul li:gt(0)').hide();
  setInterval(function () {
    $('.main_visual ul li').first().fadeOut().next().fadeIn().end().appendTo('.main_visual ul');
  }, 3000)


});
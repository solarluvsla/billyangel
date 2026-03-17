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
const mainSwiper = new Swiper('.main_visual .swiper', {
    effect: 'fade', 
    fadeEffect: {
      crossFade: true 
    },
    loop: true, 
    autoplay: {
      delay: 4000, 
      disableOnInteraction: false, 
    },
   
    on: {
      slideChange: function () {
        let currentNum = this.realIndex + 1;
        $('.main_visual .pager .num').text('0' + currentNum);
      }
    }
  });
});
$(function(){

  // 1. 네비게이션
  $('nav ul.gnb').hover(
    function() {
      $('ul.sub, .headerDim').stop().slideDown();
    }, 
    function() {
      $('ul.sub, .headerDim').stop().slideUp();
    }
  );

  // 2. main_visual (Swiper)
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

  // 매장 찾기
  const storeData = {
    jonggak: { time: "평일 08:30 - 22:00  라스트오더 21:30", phone: "02-2160-8488" },
    yeouido: { time: "평일 07:00 - 23:00  라스트오더 21:30 주말 08:00 - 22:00 라스트오더 21:30", phone: "070-4801-0141" },
    apgujeong: { time: "평일 08:30 - 20:00 주말 10:30 - 18:00", phone: "0507-1381-1402안내" },
    dangsan: { time: "평일 08:30 - 20:00 주말 10:30 - 18:00", phone: "02-2632-9555" },
    yangjae: { time: "평일 08:00 - 20:00 주말 09:00 - 18:00", phone: "0503-5260-8989" },
    mario: { time: "매일 10:30 - 21:00", phone: "02-2067-3628" },
    munjeong: { time: "월,금 08:50 - 20:30 화,수,목 08:50 - 20:30", phone: "02-2084-3131" },
    guri: { time: "매일 10:30 - 21:00  라스트오더 20:00", phone: "031-550-7342" },
    uijeongbu: { time: "매일 11:00 - 22:00  라스트오더 21:30", phone: "0031-837-1400" },
    sunae: { time: "매일 10:00 - 22:00  라스트오더 21:30", phone: "031-715-6257" },
    ansan: { time: "매일 12:00 - 22:00  라스트오더 21:30", phone: "031-413-1312" },
    suwon: { time: "매일 10:00 - 22:00", phone: "031-308-1005" },
    frombio: { time: "매일 08:00 - 20:00  라스트오더 19:30", phone: "070-4811-5945" },
    pyeongtaek: { time: "매일 10:00 - 22:00", phone: "031-681-3888" }
  };

  // 초기화: 페이지 로드 시 첫 번째 옵션(종각역점)의 데이터로 세팅
  $('#storeTime').text(storeData['jonggak'].time);
  $('#storePhone').text(storeData['jonggak'].phone);

  // 2. select 박스 값이 바뀔 때(change) 이벤트 실행
  $('#regionSelect').on('change', function() {
    const selectedValue = $(this).val(); // 선택된 옵션의 value 값 가져오기
    
  
    if (storeData[selectedValue]) {
      $('#storeTime').fadeOut(150, function() {
        $(this).text(storeData[selectedValue].time).fadeIn(150);
      });
      $('#storePhone').fadeOut(150, function() {
        $(this).text(storeData[selectedValue].phone).fadeIn(150);
      });
    }
  });

}); //ready end
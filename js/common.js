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
  
  // 3. pick (신규 케이크 슬라이더)
  const pickSwiper = new Swiper('.pick_swiper', {
    slidesPerView: 1.2,
    spaceBetween: 20,
    breakpoints: {
      768: { slidesPerView: 2.2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 30 },
      1400: { slidesPerView: 3.5, spaceBetween: 40 }
    },
    pagination: {
      el: '.pick_progress .swiper-pagination',
      type: 'progressbar',
    },
    mousewheel: {
      forceToAxis: true,
    },
    grabCursor: true,
  });

  // 3-1. 하트 버튼(좋아요) 토글
  $('.btn_like').on('click', function() {
    $(this).toggleClass('is-active');
    const icon = $(this).find('i');
    
    if ($(this).hasClass('is-active')) {
      icon.removeClass('fa-regular').addClass('fa-solid');
    } else {
      icon.removeClass('fa-solid').addClass('fa-regular');
    }
  });
  

  //이벤트
  $('.event_tabs .tab').on('click', function() {
    // 5-1. 모든 탭에서 활성화 클래스 제거 후 클릭한 탭에만 추가
    $('.event_tabs .tab').removeClass('is_active');
    $(this).addClass('is_active');

    // 5-2. 클릭한 탭의 인덱스 번호 가져오기 (0, 1, 2...)
    const tabIdx = $(this).index();

    // 5-3. (옵션) 탭에 따라 콘텐츠를 바꾸고 싶다면?
    // 실제로는 각 탭에 맞는 데이터를 storeData처럼 객체로 관리하거나 
    // 콘텐츠 박스를 여러 개 만들어놓고 .hide(), .show()로 제어합니다.
    
    // 예시: 탭 클릭 시 배너 이미지만 살짝 바꿔보기 (테스트용)
    const eventImages = [
        "asset/img/t_membership_bn.jpg", // 1번째 탭 이미지
        "asset/img/wish_event_bn.jpg",   // 2번째 탭 이미지
        "asset/img/valentine_bn.jpg"     // 3번째 탭 이미지
    ];
    
    if(eventImages[tabIdx]) {
        $('.event_banner img').fadeOut(200, function() {
            $(this).attr('src', eventImages[tabIdx]).fadeIn(200);
        });
    }
});

  // 4. 매장 찾기 데이터
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
    pyengtaek: { time: "매일 10:00 - 22:00", phone: "031-681-3888" }
  };

  // 매장찾기 초기화 및 이벤트
  $('#storeTime').text(storeData['jonggak'].time);
  $('#storePhone').text(storeData['jonggak'].phone);

  $('#regionSelect').on('change', function() {
    const selectedValue = $(this).val();
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
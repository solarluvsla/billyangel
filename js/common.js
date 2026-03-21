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
  
  //pick
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

  //하트 버튼 토글
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
    const idx = $(this).index(); // 클릭한 버튼의 순서(0, 1, 2)
    
    // 버튼 스타일 변경
    $('.event_tabs .tab').removeClass('is_active');
    $(this).addClass('is_active');
    
    // 박스 전환
    $('.event_box').hide();
    $('.event_box').eq(idx).stop().fadeIn(500);
});

//리뷰

    // [1] 상단 슬라이더 설정
    const swiperTop = new Swiper('.slide_top', {
        loop: true,
        speed: 8000,
        slidesPerView: 'auto',
        spaceBetween: 18,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true,
        },
        freeMode: true,
    });

    // [2] 하단 슬라이더 설정 (기존 유지)
    const swiperBottom = new Swiper('.slide_bottom', {
        loop: true,
        speed: 8000,
        slidesPerView: 'auto',
        spaceBetween: 18,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        freeMode: true,
    });

    // [3] 상단 슬라이드 호버 제어 (안정화 로직)
    $('.slide_top').on('mouseenter', function() {
        // 자동 재생 멈춤
        swiperTop.autoplay.stop();
        
        // 현재 wrapper의 위치값을 강제로 고정 (transition 제거)
        const wrapper = $(this).find('.swiper-wrapper');
        const transform = wrapper.css('transform');
        wrapper.css({
            'transform': transform,
            'transition-duration': '0ms'
        });
    });

    $('.slide_top').on('mouseleave', function() {
        const wrapper = $(this).find('.swiper-wrapper');
        
        // 1. CSS로 강제 고정했던 속성들을 제거하여 Swiper에게 제어권 반환
        wrapper.css({
            'transition-duration': ''
        });

        // 2. Swiper 엔진 재가동 (매우 중요)
        // 정지된 상태에서 엔진이 꼬이는 걸 방지하기 위해 update() 후 start()
        swiperTop.update();
        swiperTop.autoplay.start();
        
        // 3. 만약 여전히 안 움직인다면 미세한 강제 이동 명령 (치트키)
        // 현재 인덱스로 아주 짧은 시간(1ms) 동안 이동하게 하여 엔진을 깨웁니다.
        const currentIndex = swiperTop.activeIndex;
        swiperTop.slideTo(currentIndex, 1, false);
    });
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
  }); //ready end
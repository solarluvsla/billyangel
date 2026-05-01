$(function(){

  // 1. 네비게이션
  const $subMenus = $('nav ul.gnb > li > ul.sub').filter(function() {
    return $(this).children().length > 0;
  });

  $('nav ul.gnb').hover(
    function() {
      $subMenus.stop().slideDown();
      $('.headerDim').stop().slideDown();
    }, 
    function() {
      $subMenus.stop().slideUp();
      $('.headerDim').stop().slideUp();
    }
  );

  const $wrap = $('.wrap');
  const $menuTabs = $('.menu_tab');
  const $cakeTriggers = $('nav ul.gnb > li').eq(1).find('a').add('.js-cake-link');
  const $storeTriggers = $('nav ul.gnb > li').eq(2).find('a');
  const $homeTriggers = $('.js-home-link');
  let currentProductPrice = 38000;
  let currentProductQty = 1;

  $('.menu_product_card').each(function() {
    const $card = $(this);

    if (!$card.find('.menu_product_actions').length) {
      $card.append(`
        <div class="menu_product_actions">
          <button type="button">장바구니</button>
          <button type="button" class="js-product-buy">구매</button>
        </div>
      `);
    } else {
      $card.find('.menu_product_actions button').last().addClass('js-product-buy');
    }
  });

  function closeSpecialPages() {
    $wrap.removeClass('is-menu-open is-store-open is-product-open');
    $('body').removeClass('menu-mode store-mode product-mode');
    $('#cakeMenuPage, #storeInfoPage, #productPurchasePage').attr('aria-hidden', 'true');
  }

  function openSpecialPage(pageType) {
    closeSpecialPages();
    $('.headerDim, nav ul.gnb > li > ul.sub').stop(true, true).hide();

    if (pageType === 'menu') {
      $wrap.addClass('is-menu-open');
      $('body').addClass('menu-mode');
      $('#cakeMenuPage').attr('aria-hidden', 'false');
    }

    if (pageType === 'store') {
      $wrap.addClass('is-store-open');
      $('body').addClass('store-mode');
      $('#storeInfoPage').attr('aria-hidden', 'false');
    }

    if (pageType === 'product') {
      $wrap.addClass('is-product-open');
      $('body').addClass('product-mode');
      $('#productPurchasePage').attr('aria-hidden', 'false');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  $cakeTriggers.on('click', function(e) {
    e.preventDefault();
    openSpecialPage('menu');
  });

  $storeTriggers.on('click', function(e) {
    e.preventDefault();
    openSpecialPage('store');
  });

  $homeTriggers.on('click', function(e) {
    e.preventDefault();
    closeSpecialPages();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  $menuTabs.on('click', function() {
    $menuTabs.removeClass('is-active');
    $(this).addClass('is-active');
  });

  $('.purchase_info_tab').on('click', function() {
    const tabKey = $(this).data('tab');

    $('.purchase_info_tab').removeClass('is-active');
    $(this).addClass('is-active');

    $('.purchase_tab_panel').removeClass('is-active');
    $(`.purchase_tab_panel[data-panel="${tabKey}"]`).addClass('is-active');
  });

  function formatPrice(value) {
    return `${value.toLocaleString('ko-KR')}원`;
  }

  function syncPurchaseTotals() {
    const total = currentProductPrice * currentProductQty;
    $('#purchaseQty').text(currentProductQty);
    $('#purchaseTotal, #purchaseOrderTotal').text(formatPrice(total));
  }

  $('.menu_product_grid').on('click', '.js-product-buy', function() {
    const $card = $(this).closest('.menu_product_card');
    const $img = $card.find('.menu_product_thumb img');
    const name = $card.find('h3').text().trim();
    const desc = $card.find('p').first().text().trim();
    const priceText = $card.find('strong').first().text().trim();
    const priceValue = Number(priceText.replace(/[^\d]/g, '')) || 0;

    currentProductPrice = priceValue;
    currentProductQty = 1;

    $('#purchaseTitle, #purchaseSideName, #purchaseCountName').text(`빌리엔젤 ${name}`);
    $('#purchaseSub, #purchaseSideDesc').text(desc || '빌리엔젤의 시그니처 메뉴입니다.');
    $('#purchasePrice').text(priceText);
    $('#purchaseStoryTitle').text(name);
    $('#purchaseStoryText').text(desc || '빌리엔젤이 제안하는 대표 디저트 메뉴입니다.');
    $('#purchaseImage, #purchaseDetailImage')
      .attr('src', $img.attr('src'))
      .attr('alt', $img.attr('alt'));

    syncPurchaseTotals();
    openSpecialPage('product');
  });

  $('.js-qty-minus').on('click', function() {
    currentProductQty = Math.max(1, currentProductQty - 1);
    syncPurchaseTotals();
  });

  $('.js-qty-plus').on('click', function() {
    currentProductQty += 1;
    syncPurchaseTotals();
  });

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
  $('.btn_like, .menu_like, .store_like').on('click', function() {
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

/* 리뷰 */

const topSlideCount = document.querySelectorAll('.slide_top .swiper-slide').length;
const bottomSlideCount = document.querySelectorAll('.slide_bottom .swiper-slide').length;

const swiperTop = new Swiper('.slide_top', {
  slidesPerView: 'auto',
  spaceBetween: 18,
  loop: true,
  loopedSlides: topSlideCount,
  loopAdditionalSlides: topSlideCount,
  speed: 6000,
  allowTouchMove: false,
  watchOverflow: false,
  observer: true,
  observeParents: true,
  autoplay: {
    delay: 1,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
    reverseDirection: true
  }
});

const swiperBottom = new Swiper('.slide_bottom', {
  slidesPerView: 'auto',
  spaceBetween: 18,
  loop: true,
  loopedSlides: bottomSlideCount,
  loopAdditionalSlides: bottomSlideCount,
  speed: 6000,
  allowTouchMove: false,
  watchOverflow: false,
  observer: true,
  observeParents: true,
  autoplay: {
    delay: 1,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
    reverseDirection: false
  }
});})


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
    pyeongtaek: { time: "매일 10:00 - 22:00", phone: "031-681-3888" }
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

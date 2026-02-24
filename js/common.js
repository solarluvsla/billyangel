document.addEventListener('DOMContentLoaded', () => {
  const swiperEl = document.querySelector('.main_visual .swiper');
  if (!swiperEl) return;

  const currentEl = document.querySelector('.main_visual .pager .num');
  const totalEl = document.querySelector('.main_visual .pager .txt_box span:last-child');
  const btnBox = document.querySelector('.main_visual .pager .btn_box');

  const heroSwiper = new Swiper('.main_visual .swiper', {
    loop: true,
    speed: 800,
    slidesPerView: 1,
    spaceBetween: 0,
    grabCursor: true,

    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },

    on: {
      init(swiper) { updatePager(swiper); },
      slideChange(swiper) { updatePager(swiper); },
    }
  });

  function updatePager(swiper) {
    if (!currentEl || !totalEl) return;
    currentEl.textContent = swiper.realIndex + 1;
    totalEl.textContent = swiper.originalSlides ? swiper.originalSlides.length : 3; // fallback
  }

  // 재생/일시정지 토글
  if (btnBox) {
    btnBox.addEventListener('click', () => {
      const pauseIcon = btnBox.querySelector('.fa-pause');
      const playIcon = btnBox.querySelector('.fa-play');

      if (heroSwiper.autoplay && heroSwiper.autoplay.running) {
        heroSwiper.autoplay.stop();
        if (pauseIcon) pauseIcon.style.display = 'none';
        if (playIcon) playIcon.style.display = 'inline-block';
      } else {
        heroSwiper.autoplay.start();
        if (pauseIcon) pauseIcon.style.display = 'inline-block';
        if (playIcon) playIcon.style.display = 'none';
      }
    });
  }
});
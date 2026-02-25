document.addEventListener('DOMContentLoaded', () => {
  const swiperEl = document.querySelector('.main_visual .swiper');
  if (!swiperEl) return;

  const currentEl = document.querySelector('.main_visual .pager .num');
  const totalEl = document.querySelector('.main_visual .pager .txt_box span:last-child');
  const btnBox = document.querySelector('.main_visual .pager .btn_box');

  // ✅ 전체 비디오 제어 함수
  function syncSlideVideos(swiper) {
    const allVideos = swiperEl.querySelectorAll('video.bg_video');

    // 1) 전체 pause
    allVideos.forEach(v => {
      try {
        v.pause();
        v.currentTime = 0; // ✅ 다음에 켜질 때 처음부터
      } catch (e) {}
    });

    // 2) 활성 슬라이드 video만 play
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;

    const activeVideo = activeSlide.querySelector('video.bg_video');
    if (!activeVideo) return;

    // iOS/모바일 안정용
    activeVideo.muted = true;
    activeVideo.playsInline = true;

    const playPromise = activeVideo.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // 자동재생 차단 시에도 에러만 막고 넘어감
      });
    }
  }

  function updatePager(swiper) {
    if (!currentEl || !totalEl) return;
    currentEl.textContent = swiper.realIndex + 1;

    // ✅ loop일 때 전체 슬라이드 수 안전하게 계산
    const total = swiper.slides
      ? swiper.slides.filter(s => !s.classList.contains('swiper-slide-duplicate')).length
      : 3;

    totalEl.textContent = total || 3;
  }

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
      init(swiper) {
        updatePager(swiper);
        syncSlideVideos(swiper);

        // ✅ 처음 상태: pause 아이콘만 보이게(원하면 유지)
        if (btnBox) {
          const pauseIcon = btnBox.querySelector('.fa-pause');
          const playIcon = btnBox.querySelector('.fa-play');
          if (pauseIcon) pauseIcon.style.display = 'inline-block';
          if (playIcon) playIcon.style.display = 'none';
        }
      },
      slideChange(swiper) {
        updatePager(swiper);
        syncSlideVideos(swiper);
      },
    }
  });

  // 재생/일시정지 토글
  if (btnBox) {
    btnBox.addEventListener('click', () => {
      const pauseIcon = btnBox.querySelector('.fa-pause');
      const playIcon = btnBox.querySelector('.fa-play');

      if (heroSwiper.autoplay && heroSwiper.autoplay.running) {
        heroSwiper.autoplay.stop();

        // ✅ 자동재생 멈추면 현재 영상도 멈춤
        const activeSlide = heroSwiper.slides[heroSwiper.activeIndex];
        const activeVideo = activeSlide?.querySelector('video.bg_video');
        if (activeVideo) activeVideo.pause();

        if (pauseIcon) pauseIcon.style.display = 'none';
        if (playIcon) playIcon.style.display = 'inline-block';
      } else {
        heroSwiper.autoplay.start();

        // ✅ 자동재생 시작하면 현재 슬라이드 영상 재생
        syncSlideVideos(heroSwiper);

        if (pauseIcon) pauseIcon.style.display = 'inline-block';
        if (playIcon) playIcon.style.display = 'none';
      }
    });
  }
});
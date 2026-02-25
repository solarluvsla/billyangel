document.addEventListener('DOMContentLoaded', () => {
  /* =========================
   * 1) 메인 비주얼(hero) Swiper + pager + video sync
   * ========================= */
  const swiperEl = document.querySelector('.main_visual .swiper');

  if (swiperEl) {
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
        playPromise.catch(() => {});
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
  }


  /* =========================
   * 2) slide2에 video(hero_bg) 삽입
   * ========================= */
  const slide2 = document.querySelector('.main_visual .swiper-slide.slide2');

  if (slide2) {
    // 이미 들어가 있으면 중복 삽입 방지
    if (!slide2.querySelector('video.hero_bg')) {
      const video = document.createElement('video');
      video.className = 'hero_bg';
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;

      const source = document.createElement('source');
      source.src = 'asset/video/slide2.mp4'; // <- 파일 경로 맞게 수정
      source.type = 'video/mp4';

      video.appendChild(source);

      // 슬라이드 맨 앞에 깔기
      slide2.prepend(video);
    }
  }


  /* =========================
   * 3) pick_swiper 초기화
   * ========================= */
  const pickEl = document.querySelector('.pick_swiper');

  if (pickEl) {
    new Swiper('.pick_swiper', {
      slidesPerView: 3,
      spaceBetween: 24,
      speed: 600,
      grabCursor: true,

      pagination: {
        el: '.pick_swiper .swiper-pagination',
        type: 'progressbar',
      },

      breakpoints: {
        0:    { slidesPerView: 1.2, spaceBetween: 14 },
        768:  { slidesPerView: 2.2, spaceBetween: 18 },
        1100: { slidesPerView: 3,   spaceBetween: 24 },
      }
    });
  }
}); //dom end
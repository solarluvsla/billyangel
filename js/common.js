document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const gnbItems = document.querySelectorAll("header nav ul.gnb > li");
  const cols = document.querySelectorAll("header .ham_menu .all_con ul.list > li");
  const hamBtn = document.getElementById("hamMenu"); // 네 기존 햄버거 ul

  function isPC() {
    return window.innerWidth > 1024;
  }

  // sub 없는 메뉴 컬럼에 넣을 바로가기(순서 기반)
  // gnb 순서: 브랜드, 메뉴, 매장정보, 이벤트, 커뮤니티
  const quickByIndex = {
    2: { text: "매장정보 바로가기", href: "#store" },
    3: { text: "이벤트 바로가기", href: "#event" },
  };

  function ensureQuickLink(col, idx) {
    if (!col) return;

    // 이미 sub_list가 있으면 quick 안 보여도 됨
    if (col.querySelector(".sub_list")) return;

    const info = quickByIndex[idx];
    if (!info) return;

    let box = col.querySelector(".quick_links");
    if (!box) {
      box = document.createElement("div");
      box.className = "quick_links";
      col.appendChild(box);
    }
    box.innerHTML = `<a href="${info.href}">${info.text}</a>`;
  }

  function setActive(idx) {
    gnbItems.forEach(li => li.classList.remove("is-active"));
    cols.forEach(c => c.classList.remove("is-active"));

    if (gnbItems[idx]) gnbItems[idx].classList.add("is-active");
    if (cols[idx]) cols[idx].classList.add("is-active");
  }

  function openMega(idx) {
    if (!isPC()) return;
    header.classList.add("mega_open");
    setActive(idx);
    ensureQuickLink(cols[idx], idx);
  }

  function closeMega() {
    header.classList.remove("mega_open");
    gnbItems.forEach(li => li.classList.remove("is-active"));
    cols.forEach(c => c.classList.remove("is-active"));
  }

  // PC hover → 패널 열기 + 해당 컬럼만 강조
  gnbItems.forEach(function (li, idx) {
    li.addEventListener("mouseenter", function () {
      openMega(idx);
    });
    li.addEventListener("focusin", function () {
      openMega(idx);
    });
  });

  // 헤더 영역 벗어나면 닫기
  header.addEventListener("mouseleave", function () {
    if (isPC()) closeMega();
  });

  // 모바일 햄버거(on) 기존 유지
  if (hamBtn) {
    hamBtn.addEventListener("click", function () {
      header.classList.toggle("on");
      closeMega();
    });
  }

  // 리사이즈 시 PC mega 정리
  window.addEventListener("resize", function () {
    if (!isPC()) closeMega();
  });
}); //dom
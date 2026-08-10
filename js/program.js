/* ============================
   Mobile Navigation (hamburger)
   ※ 다른 기능에서 에러가 나도 메뉴는 항상 동작하도록 파일 맨 위에 둠
============================ */

(function () {

  const menuBtn = document.querySelector(".menu_btn");
  const headerNav = document.querySelector("#headerNav");
  const navOverlay = document.querySelector("#navOverlay");

  if (!menuBtn || !headerNav || !navOverlay) return;

  const menuIcon = menuBtn.querySelector("i");

  const megaToggles = headerNav.querySelectorAll(".mega_toggle");
  const navLinks = headerNav.querySelectorAll(".mega_head > .nav_link");

  function closeAccordion(li) {
    const toggleBtn = li.querySelector(".mega_toggle");

    li.classList.remove("open");

    if (toggleBtn) {
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  }

  function toggleAccordion(li) {
    const toggleBtn = li.querySelector(".mega_toggle");
    const isOpen = li.classList.contains("open");

    // 다른 항목은 닫고 하나만 펼쳐지게
    headerNav.querySelectorAll(".has_mega.open").forEach(function (openLi) {
      if (openLi !== li) closeAccordion(openLi);
    });

    if (isOpen) {
      closeAccordion(li);
    } else {
      li.classList.add("open");

      if (toggleBtn) {
        toggleBtn.setAttribute("aria-expanded", "true");
      }
    }
  }

  megaToggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      toggleAccordion(btn.closest(".has_mega"));
    });
  });

  // 태블릿/모바일에서는 상단 메뉴 텍스트를 눌러도 펼침/접힘 동작
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      if (window.innerWidth <= 1024) {
        event.preventDefault();
        toggleAccordion(link.closest(".has_mega"));
      }
    });
  });

  function closeAllAccordions() {
    headerNav.querySelectorAll(".has_mega.open").forEach(closeAccordion);
  }

  function openNav() {
    headerNav.classList.add("active");
    navOverlay.classList.add("active");
    document.body.classList.add("nav_open");

    if (menuIcon) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-xmark");
    }

    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.setAttribute("aria-label", "메뉴 닫기");
  }

  function closeNav() {
    headerNav.classList.remove("active");
    navOverlay.classList.remove("active");
    document.body.classList.remove("nav_open");

    if (menuIcon) {
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    }

    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "메뉴 열기");

    closeAllAccordions();
  }

  menuBtn.addEventListener("click", function () {
    if (headerNav.classList.contains("active")) {
      closeNav();
    } else {
      openNav();
    }
  });

  navOverlay.addEventListener("click", closeNav);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024) {
      closeNav();
    }
  });

})();


/* ============================
   프로그램 탭: 호버뿐만 아니라 클릭으로도 활성화
============================ */

(function () {

  const tabItems = document.querySelectorAll(".program_tab li");

  if (!tabItems.length) return;

  tabItems.forEach(function (li) {
    const link = li.querySelector("a");
    if (!link) return;

    link.addEventListener("click", function () {
      tabItems.forEach(function (item) {
        item.classList.remove("active");
      });
      li.classList.add("active");
    });
  });

})();


if (typeof Swiper === "undefined") {
  console.error("Swiper 라이브러리가 로드되지 않았습니다. CDN 스크립트 태그와 네트워크 연결을 확인해주세요.");
} else {

  /* ============================
     개막작 슬라이드
     - 자동 슬라이드 + 버튼(이전/다음) 이동
  ============================ */

  const openingSwiper = new Swiper(".opening_slide", {

    loop: true,

    speed: 500,

    slidesPerView: 1,

    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },

    navigation: {
      prevEl: ".opening_prev",
      nextEl: ".opening_next",
    },

  });


  /* ============================
     경쟁부문 슬라이드
     - 자동 슬라이드 + 버튼(이전/다음) 이동
  ============================ */

  const competitionSwiper = new Swiper(".competition_slide", {

    loop: true,

    speed: 500,

    slidesPerView: "auto",
    spaceBetween: 16,

    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },

    navigation: {
      prevEl: ".competition_prev",
      nextEl: ".competition_next",
    },

  });


  /* ============================
     초청부문 슬라이드
     - 버튼(이전/다음) 클릭으로만 이동 (자동재생 없음)
     - 끝에 도달하면 버튼이 비활성화(흐려짐) 되도록 loop 사용 안 함
  ============================ */

  const invitationSwiper = new Swiper(".invitation_slide", {

    loop: false,

    speed: 500,

    slidesPerView: "auto",
    spaceBetween: 16,

    breakpoints: {
      1025: {
        spaceBetween: 32,
      },
    },

    navigation: {
      prevEl: ".invitation_prev",
      nextEl: ".invitation_next",
    },

  });


  /* ============================
     특별상영 슬라이드
     - 버튼(이전/다음) 클릭으로만 이동 (자동재생 없음)
  ============================ */

  const specialSwiper = new Swiper(".special_slide", {

    loop: false,

    speed: 500,

    slidesPerView: "auto",
    spaceBetween: 16,

    breakpoints: {
      1025: {
        spaceBetween: 32,
      },
    },

    navigation: {
      prevEl: ".special_prev",
      nextEl: ".special_next",
    },

  });

}
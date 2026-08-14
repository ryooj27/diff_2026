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


/* ============================
   경쟁부문/초청부문/특별상영 카드
   - 터치 기기(호버 불가)에서는 탭으로 시놉시스를 열고 닫음
   - PC(마우스 호버 가능)에서는 CSS :hover가 그대로 동작하므로 개입하지 않음
============================ */

(function () {

  const isTouchDevice = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!isTouchDevice) return;

  const filmCards = document.querySelectorAll(".film_card");

  if (!filmCards.length) return;

  function closeAllCards(except) {
    filmCards.forEach(function (card) {
      if (card !== except) card.classList.remove("is_open");
    });
  }

  filmCards.forEach(function (card) {
    const link = card.querySelector("a");
    if (!link) return;

    link.addEventListener("click", function (event) {
      if (!card.classList.contains("is_open")) {
        // 첫 탭: 실제 이동 대신 시놉시스만 열기
        event.preventDefault();
        closeAllCards(card);
        card.classList.add("is_open");
      }
      // 이미 열려 있는 상태에서 다시 탭하면 정상적으로 링크 이동
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".film_card")) {
      closeAllCards(null);
    }
  });

})();
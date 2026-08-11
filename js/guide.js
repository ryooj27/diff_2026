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
   상영 일정표 날짜 탭 / 예매 안내 탭
   - 클릭한 것만 활성화 (밑줄 애니메이션은 CSS transition으로 처리)
============================ */

(function () {

  function setupTabGroup(selector) {
    const buttons = document.querySelectorAll(selector);

    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
      });
    });
  }

  setupTabGroup(".date_tab button");
  setupTabGroup(".ticket_tab button");

})();


/* ============================
   관람안내 좌측(어사이드) 메뉴
   - 클릭 시 즉시 활성화
   - 스크롤 위치에 따라 자동으로 활성화 (스크롤스파이)
============================ */

(function () {

  const navItems = document.querySelectorAll(".guide_nav li");

  if (!navItems.length) return;

  function setActive(targetLi) {
    navItems.forEach(function (item) {
      item.classList.remove("active");
    });
    targetLi.classList.add("active");
  }

  let suppressScrollSpyUntil = 0;

  navItems.forEach(function (li) {
    const link = li.querySelector("a");
    if (!link) return;

    link.addEventListener("click", function () {
      setActive(li);
      suppressScrollSpyUntil = Date.now() + 1000;
    });
  });

  const sections = document.querySelectorAll(
    "#first, #schedule, #ticket, #notice, #place"
  );

  if (sections.length && "IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
      function (entries) {
        if (Date.now() < suppressScrollSpyUntil) return;

        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          const matchingLink = document.querySelector(
            '.guide_nav a[href="#' + entry.target.id + '"]'
          );

          if (matchingLink) {
            setActive(matchingLink.closest("li"));
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });

  }

})();


/* ============================
   '처음 오셨나요?' 아이콘
   - 화면에 들어오면 순서대로 회색 -> 주황 애니메이션
============================ */

(function () {

  const stepList = document.querySelector(".step_list");

  if (!stepList) return;

  if (!("IntersectionObserver" in window)) {
    stepList.classList.add("in_view");
    return;
  }

  const stepObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          stepList.classList.add("in_view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  stepObserver.observe(stepList);

})();
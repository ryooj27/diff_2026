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


function PanoramaEffect({ swiper, extendParams, on }) {

  extendParams({
    panoramaEffect:{
      depth:300,
      rotate:25
    }
  });


  on("beforeInit", () => {

    if(swiper.params.effect !== "panorama") return;

    swiper.classNames.push(
      `${swiper.params.containerModifierClass}panorama`
    );

    /* 예전에는 swiper-3d 클래스를 추가해 실제 CSS 3D(perspective)를 사용했으나,
       iOS Safari에서 overflow:hidden을 가진 조상 요소(가로 스크롤 방지용으로
       html/body에 필요)와 3D perspective 요소가 만나면 렌더링이 깨지는
       고질적인 버그가 있어 3D 클래스는 더 이상 추가하지 않음.
       아래 progress 핸들러도 2D 변형(translateX + scale)만 사용하도록 변경함 */

    Object.assign(swiper.params,{
      watchSlidesProgress:true
    });

    Object.assign(swiper.originalParams,{
      watchSlidesProgress:true
    });

  });



  on("progress",()=>{

    if(swiper.params.effect !== "panorama") return;


    swiper.slides.forEach((slide,index)=>{

      const progress = slide.progress;

      const slideWidth = swiper.slidesSizesGrid[index];

      const position = progress;

      // 중앙에서 멀어질수록(|position|이 클수록) 작아지고 옆으로 밀려나도록
      const clamped = Math.max(-2, Math.min(2, position));
      const distance = Math.min(Math.abs(clamped), 1);

      const scale = 1 - distance * 0.22;

      const translateX =
        `${clamped * (slideWidth / 2.4)}px`;

      slide.style.opacity = `${1 - distance * 0.35}`;

      slide.style.transform =
        `translateX(${translateX}) scale(${scale})`;

    });

  });



  on("setTransition",(swiper,speed)=>{

    if(swiper.params.effect === "panorama"){

      swiper.slides.forEach(slide=>{

        slide.style.transitionDuration =
          `${speed}ms`;

      });

    }

  });

}



const posterSlides = document.querySelectorAll(".poster_slide .swiper-slide");
const posterNameEl = document.querySelector(".poster_name");
const posterDateEl = document.querySelector(".poster_date");
const posterPlaceEl = document.querySelector(".poster_place");

function updatePosterInfo(swiper) {

  const activeSlide = posterSlides[swiper.realIndex];

  if (!activeSlide) return;

  if (posterNameEl) posterNameEl.textContent = activeSlide.dataset.name || "";
  if (posterDateEl) posterDateEl.textContent = activeSlide.dataset.date || "";
  if (posterPlaceEl) posterPlaceEl.textContent = activeSlide.dataset.place || "";

}

const posterSwiper = new Swiper(".poster_slide",{


  modules:[PanoramaEffect],


  effect:"panorama",


  slidesPerView:"auto",


  centeredSlides:true,


  loop:true,


  spaceBetween:30,


  panoramaEffect:{

    depth:300,

    rotate:25

  },


  navigation:{

    prevEl:".poster_prev",

    nextEl:".poster_next"

  },


  on:{

    init:function () { updatePosterInfo(this); },

    slideChange:function () { updatePosterInfo(this); }

  }


});

const videoOpen = document.querySelector("#videoOpen");
const videoModal = document.querySelector("#videoModal");
const videoClose = document.querySelector("#videoClose");
const youtubePlayer = document.querySelector("#youtubePlayer");

const videoId = "9jJ-mUUHaKg";

function openVideo() {
  videoModal.classList.add("active");
  document.body.classList.add("modal_open");

  youtubePlayer.src =
    "https://www.youtube.com/embed/" +
    videoId +
    "?autoplay=1&rel=0";
}

function closeVideo() {
  videoModal.classList.remove("active");
  document.body.classList.remove("modal_open");

  youtubePlayer.src = "";
}

videoOpen.addEventListener("click", openVideo);

videoClose.addEventListener("click", closeVideo);

videoModal.addEventListener("click", function (event) {
  if (event.target === videoModal) {
    closeVideo();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeVideo();
  }
});

/* ============================
   About DIFF count-up animation
============================ */

const countEls = document.querySelectorAll(".count[data-count]");

function animateCount(el) {

  const target = parseInt(el.dataset.count, 10) || 0;
  const duration = 1000;
  let startTime = null;

  function step(timestamp) {

    if (!startTime) startTime = timestamp;

    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

    const current = Math.floor(eased * target);

    el.textContent = current.toLocaleString("ko-KR");

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target.toLocaleString("ko-KR");
    }

  }

  requestAnimationFrame(step);

}

if (countEls.length) {

  const countObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  countEls.forEach(function (el) {
    countObserver.observe(el);
  });

}
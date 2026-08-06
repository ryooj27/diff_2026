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

    swiper.classNames.push(
      `${swiper.params.containerModifierClass}3d`
    );


    Object.assign(swiper.params,{
      watchSlidesProgress:true
    });

    Object.assign(swiper.originalParams,{
      watchSlidesProgress:true
    });

  });



  on("progress",()=>{

    if(swiper.params.effect !== "panorama") return;


    const {
      depth = 300,
      rotate = 25
    } = swiper.params.panoramaEffect;


    const radian = rotate * Math.PI / 180 / 2;
    const ratio = 1 / (180 / rotate);


    swiper.slides.forEach((slide,index)=>{

      const progress = slide.progress;

      const slideWidth = swiper.slidesSizesGrid[index];

      const position = progress;


      const scaleFactor =
        1 - Math.cos(position * ratio * Math.PI);


      const translateX =
        `${position * (slideWidth / 3) * scaleFactor}px`;


      const rotateY =
        `${position * rotate}deg`;


      const translateZ =
        `${slideWidth * 0.5 / Math.sin(radian) * scaleFactor - depth}px`;


      slide.style.transform =
        `
        translateX(${translateX})
        translateZ(${translateZ})
        rotateY(${rotateY})
        `;

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
   Mobile Navigation (hamburger)
============================ */

const menuBtn = document.querySelector(".menu_btn");
const headerNav = document.querySelector("#headerNav");
const navOverlay = document.querySelector("#navOverlay");
const menuIcon = menuBtn ? menuBtn.querySelector("i") : null;

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
}

if (menuBtn && headerNav && navOverlay) {

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

}

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
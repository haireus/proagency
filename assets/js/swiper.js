document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.mySwiper')) {
    new Swiper('.mySwiper', {
      loop: true,
      centeredSlides: false,
      grabCursor: true,

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },

      autoplay: {
        delay: 500,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },

      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 25,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 6,
          spaceBetween: 30,
        },
      },
    });
  }
});

// Testimonials Carousel
document.addEventListener('DOMContentLoaded', function () {
  const prevBtn = document.querySelector('.testimonial-nav-btn.prev-btn');
  const nextBtn = document.querySelector('.testimonial-nav-btn.next-btn');
  const testimonialsGrid = document.querySelector('.testimonials-grid');
  const cards = document.querySelectorAll('.testimonial-card');

  if (!prevBtn || !nextBtn || !testimonialsGrid || cards.length === 0) return;

  let currentIndex = 0;
  let cardsToShow = 2; // Show 2 cards at a time on desktop
  const totalCards = cards.length;

  function getCardsToShow() {
    // Show 1 card on mobile, 2 on desktop
    return window.innerWidth < 992 ? 1 : 2;
  }

  function updateCarousel() {
    cardsToShow = getCardsToShow();
    const maxIndex = Math.ceil(totalCards / cardsToShow) - 1;

    // Adjust currentIndex if it's out of bounds after resize
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    const cardWidth = cards[0].offsetWidth;
    const gap = 30; // Match the gap in CSS
    const offset = currentIndex * (cardWidth * cardsToShow + gap * cardsToShow);

    testimonialsGrid.style.transform = `translateX(-${offset}px)`;

    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === maxIndex;

    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
    prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
    nextBtn.style.cursor =
      currentIndex === maxIndex ? 'not-allowed' : 'pointer';
  }

  function nextSlide() {
    const maxIndex = Math.ceil(totalCards / cardsToShow) - 1;
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      updateCarousel();
    }, 250);
  });

  // Initialize
  updateCarousel();

  // Optional: Auto-play carousel
  // let autoplayInterval;
  // function startAutoplay() {
  //   autoplayInterval = setInterval(() => {
  //     if (currentIndex === maxIndex) {
  //       currentIndex = 0;
  //     } else {
  //       currentIndex++;
  //     }
  //     updateCarousel();
  //   }, 5000); // Change slide every 5 seconds
  // }

  // function stopAutoplay() {
  //   clearInterval(autoplayInterval);
  // }

  // testimonialsGrid.addEventListener('mouseenter', stopAutoplay);
  // testimonialsGrid.addEventListener('mouseleave', startAutoplay);

  // startAutoplay();
});

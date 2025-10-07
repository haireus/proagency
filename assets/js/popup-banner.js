// Pop-up and Floating Banner JavaScript

// Configuration
const CONFIG = {
  popupDelay: 500, // Show popup after 0.5 seconds (immediate on first load)
  floatingBannerDelay: 3000, // Show floating banner after 3 seconds
  localStoragePopupKey: 'proagency_popup_shown_ever', // Track if popup was ever shown
  sessionStorageKey: 'proagency_popup_shown',
  floatingBannerKey: 'proagency_floating_banner_closed',
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  initializePopupBanner();
});

function initializePopupBanner() {
  // Check if user has ever seen the popup (localStorage) vs this session (sessionStorage)
  const popupEverShown = localStorage.getItem(CONFIG.localStoragePopupKey);
  const popupShownThisSession = sessionStorage.getItem(
    CONFIG.sessionStorageKey
  );
  const bannerClosed = localStorage.getItem(CONFIG.floatingBannerKey);

  // Show floating banner (keep current behavior)
  if (!bannerClosed) {
    setTimeout(showFloatingBanner, CONFIG.floatingBannerDelay);
  }

  // Show popup immediately on first-ever visit, or after delay if returning in same session
  if (!popupEverShown) {
    // First time visitor - show popup immediately
    setTimeout(showPopup, CONFIG.popupDelay);
  } else if (!popupShownThisSession) {
    // Returning visitor but new session - show with longer delay
    setTimeout(showPopup, CONFIG.popupDelay * 10);
  }

  // Add event listeners
  setupEventListeners();
}

function setupEventListeners() {
  // Close popup when clicking overlay
  const popupOverlay = document.getElementById('popupOverlay');
  if (popupOverlay) {
    popupOverlay.addEventListener('click', function (e) {
      if (e.target === popupOverlay) {
        closePopup();
      }
    });
  }

  // Close popup on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closePopup();
      closeFloatingBanner();
    }
  });
}

function showPopup() {
  const popup = document.getElementById('popupOverlay');
  if (popup) {
    popup.classList.add('active');
    // Mark as shown in both session and localStorage
    sessionStorage.setItem(CONFIG.sessionStorageKey, 'true');
    localStorage.setItem(CONFIG.localStoragePopupKey, 'true');

    // Track analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'popup_shown', {
        event_category: 'engagement',
        event_label: 'exclusive_benefits_popup',
      });
    }
  }
}

function closePopup() {
  const popup = document.getElementById('popupOverlay');
  if (popup) {
    popup.classList.remove('active');

    // Track analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'popup_closed', {
        event_category: 'engagement',
        event_label: 'exclusive_benefits_popup',
      });
    }
  }
}

function showFloatingBanner() {
  const banner = document.getElementById('floatingBanner');
  if (banner) {
    banner.classList.remove('hidden');

    // Track analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'floating_banner_shown', {
        event_category: 'engagement',
        event_label: 'exclusive_benefits_banner',
      });
    }
  }
}

function closeFloatingBanner() {
  const banner = document.getElementById('floatingBanner');
  if (banner) {
    banner.classList.add('hidden');
    localStorage.setItem(CONFIG.floatingBannerKey, 'true');

    // Track analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'floating_banner_closed', {
        event_category: 'engagement',
        event_label: 'exclusive_benefits_banner',
      });
    }
  }
}

// Function to show popup manually (can be called from other scripts)
function triggerPopup() {
  showPopup();
}

// Function to reset popup/banner state (for testing)
function resetPopupBannerState() {
  sessionStorage.removeItem(CONFIG.sessionStorageKey);
  localStorage.removeItem(CONFIG.localStoragePopupKey);
  localStorage.removeItem(CONFIG.floatingBannerKey);
  location.reload();
}

// Track CTA clicks
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('floating-banner-cta')) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'floating_banner_cta_click', {
        event_category: 'conversion',
        event_label: 'telegram_contact',
      });
    }
  }

  if (e.target.classList.contains('popup-cta')) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'popup_cta_click', {
        event_category: 'conversion',
        event_label: 'telegram_contact',
      });
    }
  }
});

// Show floating banner on scroll (alternative trigger)
let scrollTriggered = false;
window.addEventListener('scroll', function () {
  if (!scrollTriggered && window.scrollY > 1000) {
    const bannerClosed = localStorage.getItem(CONFIG.floatingBannerKey);
    if (!bannerClosed) {
      showFloatingBanner();
      scrollTriggered = true;
    }
  }
});

// Mobile touch support
let touchStartY = 0;
document.addEventListener('touchstart', function (e) {
  touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function (e) {
  const touchEndY = e.changedTouches[0].clientY;
  const banner = document.getElementById('floatingBanner');

  // If swipe down on banner, close it
  if (
    banner &&
    !banner.classList.contains('hidden') &&
    touchEndY - touchStartY > 50
  ) {
    const bannerRect = banner.getBoundingClientRect();
    if (touchStartY >= bannerRect.top && touchStartY <= bannerRect.bottom) {
      closeFloatingBanner();
    }
  }
});

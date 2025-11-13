'use strict';

const navOpenBtn = document.querySelector('[data-nav-open-btn]');
const navbar = document.querySelector('[data-navbar]');
const navCloseBtn = document.querySelector('[data-nav-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const elemArr = [navCloseBtn, overlay, navOpenBtn];

for (let i = 0; i < elemArr.length; i++) {
  elemArr[i].addEventListener('click', function () {
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
  });
}

/**
 * toggle navbar & overlay when click any navbar-link
 */

const navbarLinks = document.querySelectorAll('[data-navbar-link]');

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener('click', function () {
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
  });
}

/**
 * header & go-top-btn active
 * when window scroll down to 400px
 */

const header = document.querySelector('[data-header]');
const goTopBtn = document.querySelector('[data-go-top]');

let lastScrollY = 0;

window.addEventListener('scroll', function () {
  const currentScrollY = window.scrollY;

  if (currentScrollY >= 50) {
    header.classList.add('active');
    if (goTopBtn) goTopBtn.classList.add('active');
  } else {
    header.classList.remove('active');
    if (goTopBtn) goTopBtn.classList.remove('active');
  }

  lastScrollY = currentScrollY;
});
function myFunctionMail() {
  // Get the text field
  var copyText = document.getElementById('mail-main');

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  // alert("Copied the text: " + copyText.value);
}

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  document.getElementById(cityName).style.display = 'block';
  evt.currentTarget.className += ' active';
}

const defaultTabTrigger = document.getElementById('defaultOpen');
if (defaultTabTrigger) {
  defaultTabTrigger.click();
}

//--- Accordion --- //
const items = document.querySelectorAll('.accordion button');

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');

  for (let i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }

  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}

items.forEach((item) => item.addEventListener('click', toggleAccordion));

// Smooth scroll with header offset for navigation links
document.addEventListener('DOMContentLoaded', function () {
  const headerHeight = 100; // Height to offset for fixed header

  // Handle all anchor links that start with #
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      // Skip if it's just # or empty
      if (targetId === '#' || targetId.length <= 1) return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        const scrollToTarget = (element, behavior = 'smooth') => {
          const targetPosition =
            element.getBoundingClientRect().top + window.scrollY - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior,
          });
        };

        if (
          targetElement.classList.contains('news-entry') &&
          targetElement.tagName.toLowerCase() === 'details'
        ) {
          targetElement.setAttribute('open', '');
          scrollToTarget(targetElement);
        } else {
          scrollToTarget(targetElement);
        }
      }
    });
  });

  const openNewsEntryFromHash = (behavior = 'auto') => {
    const hash = window.location.hash;
    if (!hash) return;
    const targetElement = document.querySelector(hash);
    if (
      targetElement &&
      targetElement.classList.contains('news-entry') &&
      targetElement.tagName.toLowerCase() === 'details'
    ) {
      targetElement.setAttribute('open', '');
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior,
      });
    }
  };

  // Open relevant news article if arriving with a hash
  if (window.location.hash) {
    setTimeout(() => {
      openNewsEntryFromHash('auto');
    }, 120);
  }

  window.addEventListener('hashchange', () => openNewsEntryFromHash());

  // Events gallery media switcher
  const mediaViewer = document.querySelector('[data-event-media]');
  const mediaThumbContainer = document.querySelector(
    '[data-event-media-thumbs]'
  );
  const prevMediaBtn = document.querySelector('.events-media-prev');
  const nextMediaBtn = document.querySelector('.events-media-next');

  const resolveLanguage = () => {
    const stored = localStorage.getItem('language');
    if (stored && arrLang[stored]) {
      return stored;
    }
    return 'en-gb';
  };

  const activeLang = resolveLanguage();
  const translate = (key) =>
    (arrLang[activeLang] && arrLang[activeLang][key]) || '';

  const eventCardsData = [
    {
      id: 'affiliate-world-asia-2025',
      highlight: true,
      badgeKey: 'EVENTS-HIGHLIGHT',
      icon: 'planet-outline',
      image: './assets/images/Affiliate World Asia.jpg',
      titleKey: 'EVENTS-CARD-1-TITLE',
      dateKey: 'EVENTS-CARD-1-DATE',
      locationKey: 'EVENTS-CARD-1-LOCATION',
      descKey: 'EVENTS-CARD-1-DESC',
    },
    {
      id: 'broconf-2024',
      highlight: false,
      icon: 'people-outline',
      image: './assets/images/BROCONF 4 2024.jpg',
      titleKey: 'EVENTS-CARD-2-TITLE',
      dateKey: 'EVENTS-CARD-2-DATE',
      locationKey: 'EVENTS-CARD-2-LOCATION',
      descKey: 'EVENTS-CARD-2-DESC',
    },
    {
      id: 'affiliate-world-asia-2024',
      highlight: false,
      icon: 'globe-outline',
      image: './assets/images/Affiliate World Asia.jpg',
      titleKey: 'EVENTS-CARD-3-TITLE',
      dateKey: 'EVENTS-CARD-3-DATE',
      locationKey: 'EVENTS-CARD-3-LOCATION',
      descKey: 'EVENTS-CARD-3-DESC',
    },
  ];

  const cardTrack = document.querySelector('[data-event-card-track]');
  const cardDotsContainer = document.querySelector('[data-event-card-dots]');
  const prevCardBtn = document.querySelector('.events-card-prev');
  const nextCardBtn = document.querySelector('.events-card-next');

  if (cardTrack && eventCardsData.length) {
    cardTrack.innerHTML = '';
    if (cardDotsContainer) {
      cardDotsContainer.innerHTML = '';
    }

    eventCardsData.forEach((event, index) => {
      const card = document.createElement('article');
      card.className = 'event-card';
      if (event.highlight) {
        card.classList.add('event-card-highlight');
      }
      card.setAttribute('data-event-id', event.id);

      if (event.highlight && event.badgeKey) {
        const badge = document.createElement('span');
        badge.className = 'event-card-badge lang';
        badge.setAttribute('key', event.badgeKey);
        badge.innerHTML = translate(event.badgeKey);
        card.appendChild(badge);
      }

      const figure = document.createElement('figure');
      figure.className = 'event-card-media';
      const img = document.createElement('img');
      img.src = event.image;
      img.alt = translate(event.titleKey);
      img.loading = 'lazy';
      figure.appendChild(img);
      card.appendChild(figure);

      const content = document.createElement('div');
      content.className = 'event-card-content';

      const label = document.createElement('div');
      label.className = 'event-card-label';
      const icon = document.createElement('ion-icon');
      icon.setAttribute('name', event.icon);
      label.appendChild(icon);
      content.appendChild(label);

      const title = document.createElement('h3');
      title.className = 'event-card-title lang';
      title.setAttribute('key', event.titleKey);
      title.innerHTML = translate(event.titleKey);
      content.appendChild(title);

      const metaList = document.createElement('ul');
      metaList.className = 'event-card-meta';

      const dateItem = document.createElement('li');
      const dateIcon = document.createElement('ion-icon');
      dateIcon.setAttribute('name', 'calendar-outline');
      dateItem.appendChild(dateIcon);
      const dateText = document.createElement('span');
      dateText.className = 'lang';
      dateText.setAttribute('key', event.dateKey);
      dateText.innerHTML = translate(event.dateKey);
      dateItem.appendChild(dateText);
      metaList.appendChild(dateItem);

      const locationItem = document.createElement('li');
      const locationIcon = document.createElement('ion-icon');
      locationIcon.setAttribute('name', 'location-outline');
      locationItem.appendChild(locationIcon);
      const locationText = document.createElement('span');
      locationText.className = 'lang';
      locationText.setAttribute('key', event.locationKey);
      locationText.innerHTML = translate(event.locationKey);
      locationItem.appendChild(locationText);
      metaList.appendChild(locationItem);

      content.appendChild(metaList);

      const description = document.createElement('p');
      description.className = 'event-card-text lang';
      description.setAttribute('key', event.descKey);
      description.innerHTML = translate(event.descKey);
      content.appendChild(description);

      card.appendChild(content);
      cardTrack.appendChild(card);

      if (cardDotsContainer) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute(
          'aria-label',
          `Go to ${translate(event.titleKey)} event`
        );
        dot.addEventListener('click', () => {
          updateCardSlider(index);
        });
        cardDotsContainer.appendChild(dot);
      }
    });

    const totalCards = eventCardsData.length;
    let cardIndex = 0;
    const dots = cardDotsContainer
      ? cardDotsContainer.querySelectorAll('button')
      : [];

    const updateCardSlider = (index) => {
      cardIndex = index;
      cardTrack.style.transform = `translateX(-${cardIndex * 100}%)`;

      if (prevCardBtn) {
        prevCardBtn.disabled = cardIndex === 0;
      }
      if (nextCardBtn) {
        nextCardBtn.disabled = cardIndex === totalCards - 1;
      }

      if (dots.length) {
        dots.forEach((dot, idx) => {
          dot.classList.toggle('is-active', idx === cardIndex);
        });
      }
    };

    if (prevCardBtn) {
      prevCardBtn.addEventListener('click', () => {
        if (cardIndex === 0) return;
        updateCardSlider(cardIndex - 1);
      });
    }

    if (nextCardBtn) {
      nextCardBtn.addEventListener('click', () => {
        if (cardIndex >= totalCards - 1) return;
        updateCardSlider(cardIndex + 1);
      });
    }

    if (totalCards <= 1) {
      if (prevCardBtn) prevCardBtn.style.display = 'none';
      if (nextCardBtn) nextCardBtn.style.display = 'none';
      if (cardDotsContainer) cardDotsContainer.style.display = 'none';
    } else {
      updateCardSlider(0);
    }
  }

  const mediaItems = [
    {
      type: 'image',
      src: './assets/images/Affiliate World Asia.jpg',
      thumb: './assets/images/Affiliate World Asia.jpg',
      alt: 'Affiliate World Asia 2024 exhibition hall',
    },
    {
      type: 'video',
      src: './assets/images/Affiliate World Asia.mp4',
      poster: './assets/images/Affiliate World Asia.jpg',
      thumb: './assets/images/Affiliate World Asia.jpg',
      alt: 'Affiliate World Asia 2024 walkthrough video',
      mime: 'video/mp4',
    },
    {
      type: 'image',
      src: './assets/images/BROCONF 4 2024.jpg',
      thumb: './assets/images/BROCONF 4 2024.jpg',
      alt: 'BROCONF 4 networking showcase',
    },
    {
      type: 'image',
      src: './assets/images/BROCONF 4 2024 (1).jpg',
      thumb: './assets/images/BROCONF 4 2024 (1).jpg',
      alt: 'BROCONF 4 partner meet-up',
    },
    {
      type: 'image',
      src: './assets/images/BROCONF 4 2024.png',
      thumb: './assets/images/BROCONF 4 2024.png',
      alt: 'BROCONF 4 conference main stage',
    },
    {
      type: 'video',
      src: './assets/images/afw budapest 2025.mp4',
      poster: './assets/images/budapest 2.jpg',
      thumb: './assets/images/budapest 2.jpg',
      alt: 'Affiliate World Budapest 2025 announcement video',
      mime: 'video/mp4',
    },
    {
      type: 'image',
      src: './assets/images/budapest 2.jpg',
      thumb: './assets/images/budapest 2.jpg',
      alt: 'Budapest cityscape with Affiliate World branding',
    },
    {
      type: 'video',
      src: './assets/images/budapest 2.mp4',
      poster: './assets/images/budapest 2.jpg',
      thumb: './assets/images/budapest 2.jpg',
      alt: 'Affiliate World Budapest 2025 teaser video',
      mime: 'video/mp4',
    },
  ];

  if (mediaViewer && mediaThumbContainer && mediaItems.length) {
    mediaThumbContainer.innerHTML = '';

    mediaItems.forEach((item, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'events-media-thumb';
      if (index === 0) {
        button.classList.add('is-active');
      }
      button.dataset.mediaType = item.type;
      button.dataset.mediaSrc = item.src;
      button.dataset.mediaAlt = item.alt || '';
      button.setAttribute('role', 'listitem');
      button.setAttribute(
        'aria-label',
        item.alt ? `${item.alt}` : `Event highlight ${index + 1}`
      );

      if (item.poster) {
        button.dataset.mediaPoster = item.poster;
      }

      if (item.mime) {
        button.dataset.mediaMime = item.mime;
      }

      const thumbImg = document.createElement('img');
      thumbImg.src = item.thumb || item.poster || item.src;
      thumbImg.alt = item.alt
        ? `${item.alt} thumbnail`
        : `Event highlight ${index + 1}`;
      button.appendChild(thumbImg);

      mediaThumbContainer.appendChild(button);
    });

    const mediaThumbs = mediaThumbContainer.querySelectorAll(
      '.events-media-thumb'
    );
    let currentIndex = 0;

    const setActiveThumb = (index) => {
      mediaThumbs.forEach((thumb, idx) => {
        thumb.classList.toggle('is-active', idx === index);
      });
    };

    const renderMedia = (index) => {
      const thumb = mediaThumbs[index];
      if (!thumb) return;

      const { mediaType, mediaSrc, mediaPoster, mediaAlt, mediaMime } =
        thumb.dataset;

      mediaViewer.innerHTML = '';

      if (mediaType === 'video') {
        const video = document.createElement('video');
        video.controls = true;
        video.preload = 'metadata';
        video.playsInline = true;
        video.setAttribute('aria-label', mediaAlt || '');
        if (mediaPoster) {
          video.poster = mediaPoster;
        }

        const source = document.createElement('source');
        source.src = mediaSrc;
        source.type = mediaMime || 'video/mp4';
        video.appendChild(source);

        mediaViewer.appendChild(video);
        video.load();
      } else {
        const img = document.createElement('img');
        img.src = mediaSrc;
        img.alt = mediaAlt || '';
        img.loading = 'lazy';
        mediaViewer.appendChild(img);
      }
    };

    const updateMedia = (index) => {
      currentIndex = index;
      renderMedia(currentIndex);
      setActiveThumb(currentIndex);
    };

    mediaThumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        if (currentIndex === index) return;
        updateMedia(index);
      });
    });

    const shiftMedia = (direction) => {
      const total = mediaThumbs.length;
      if (!total) return;
      currentIndex = (currentIndex + direction + total) % total;
      updateMedia(currentIndex);
    };

    if (prevMediaBtn) {
      prevMediaBtn.addEventListener('click', () => shiftMedia(-1));
    }

    if (nextMediaBtn) {
      nextMediaBtn.addEventListener('click', () => shiftMedia(1));
    }

    if (mediaThumbs.length <= 1) {
      if (prevMediaBtn) prevMediaBtn.style.display = 'none';
      if (nextMediaBtn) nextMediaBtn.style.display = 'none';
    }

    updateMedia(0);
  }
});

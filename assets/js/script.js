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

document.getElementById('defaultOpen').click();

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

        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
});

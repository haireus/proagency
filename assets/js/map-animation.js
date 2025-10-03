// Random pulse animation for map pins
document.addEventListener('DOMContentLoaded', function () {
  const mapPins = document.querySelectorAll('.map-pin');

  if (mapPins.length === 0) return;

  function randomPulse() {
    // Select a random pin
    const randomIndex = Math.floor(Math.random() * mapPins.length);
    const pin = mapPins[randomIndex];

    // Add pulse class
    pin.classList.add('pulse');

    // Show country name
    pin.classList.add('show-name');

    // Remove pulse class and hide name after animation completes
    setTimeout(() => {
      pin.classList.remove('pulse');
    }, 2000);

    setTimeout(() => {
      pin.classList.remove('show-name');
    }, 2000);
  }

  // Initial pulse after page loads
  setTimeout(randomPulse, 1000);

  // Continue pulsing randomly every 1 second
  setInterval(() => {
    randomPulse();
  }, 1000);
});

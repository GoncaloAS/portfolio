const dots = [];
const cursor = {
  x: 0,
  y: 0,
};
let mouseInWindow = true;
let dotsInitialized = false;

// Handle mouse movement
document.addEventListener('mousemove', (e) => {
  if (!mouseInWindow) {
    dots.forEach((dot) => (dot.style.display = 'block'));
    mouseInWindow = true;
  }
  cursor.x = e.clientX + window.scrollX; // Account for horizontal scroll
  cursor.y = e.clientY + window.scrollY; // Account for vertical scroll
  if (!dotsInitialized) {
    createDots();
    dotsInitialized = true;
  }
});

// Handle mouse leaving the window
window.addEventListener('blur', hideDots);
window.addEventListener('mouseout', hideDots);

// Periodically check if cursor is within the viewport
setInterval(() => {
  const { x, y } = cursor;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  if (
    x < 0 ||
    x > viewportWidth + window.scrollX ||
    y < 0 ||
    y > viewportHeight + window.scrollY
  ) {
    hideDots();
  }
}, 1000);

function hideDots() {
  dots.forEach((dot) => (dot.style.display = 'none'));
  mouseInWindow = false;
}

// Initialize dots when the mouse moves for the first time
function createDots() {
  // Create dots and position them around the initial cursor position
  for (let i = 0; i < 40; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    document.body.appendChild(dot);
    dots.push(dot);

    dot.style.left = cursor.x + 'px';
    dot.style.top = cursor.y + 'px';
  }
}

function draw() {
  if (!mouseInWindow) return;
  let x = cursor.x;
  let y = cursor.y;

  dots.forEach((dot, index) => {
    const nextDot = dots[index + 1] || dots[0];

    dot.style.left = x + 'px';
    dot.style.top = y + 'px';

    x += (nextDot.offsetLeft - dot.offsetLeft) * 0.5;
    y += (nextDot.offsetTop - dot.offsetTop) * 0.5;
  });
}

setInterval(draw, 5);

const canvas = document.getElementById('orbCanvas');
const ctx = canvas.getContext('2d');

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

const speedSlider = document.getElementById('speedSlider');
const sizeSlider = document.getElementById('sizeSlider');

let speedMultiplier = parseFloat(speedSlider.value);
let baseRadius = parseInt(sizeSlider.value, 10);

const ORB_COUNT = 20;
const orbs = [];

function createOrb() {
  const radius = baseRadius;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2,
    radius,
  };
}

for (let i = 0; i < ORB_COUNT; i++) {
  orbs.push(createOrb());
}

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'white';

  orbs.forEach((o) => {
    o.x += o.dx * speedMultiplier;
    o.y += o.dy * speedMultiplier;
    if (o.x - o.radius < 0 || o.x + o.radius > width) {
      o.dx *= -1;
    }
    if (o.y - o.radius < 0 || o.y + o.radius > height) {
      o.dy *= -1;
    }
    ctx.beginPath();
    ctx.arc(o.x, o.y, o.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();

speedSlider.addEventListener('input', () => {
  speedMultiplier = parseFloat(speedSlider.value);
});

sizeSlider.addEventListener('input', () => {
  baseRadius = parseInt(sizeSlider.value, 10);
  orbs.forEach((o) => {
    o.radius = baseRadius;
  });
});


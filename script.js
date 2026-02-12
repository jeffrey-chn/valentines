const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const song = document.getElementById("loveSong");

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

const dangerRadius = 160;
const minDistanceFromYes = 80;
let lastMoveTime = 0;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function moveNoButtonAway(mouseX, mouseY) {
  const now = Date.now();
  if (now - lastMoveTime < 180) return; // cooldown
  lastMoveTime = now;

  const container = document.querySelector(".buttons");
  const containerRect = container.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();

  // Current center of No button
  const noCenterX = noRect.left + noRect.width / 2;
  const noCenterY = noRect.top + noRect.height / 2;

  // Direction away from cursor
  let dx = noCenterX - mouseX;
  let dy = noCenterY - mouseY;

  const length = Math.hypot(dx, dy) || 1;
  dx /= length;
  dy /= length;

  // Strong vertical bias
  dy *= 1.8;

  const moveDistance = 90;

  let newLeft =
    noBtn.offsetLeft + dx * moveDistance;
  let newTop =
    noBtn.offsetTop + dy * moveDistance;

  // Clamp inside container
  const maxX = containerRect.width - noRect.width;
  const maxY = containerRect.height - noRect.height;

  newLeft = clamp(newLeft, 0, maxX);
  newTop = clamp(newTop, 0, maxY);

  // Prevent touching Yes button
  const futureNoRect = {
    left: containerRect.left + newLeft,
    top: containerRect.top + newTop,
    right: containerRect.left + newLeft + noRect.width,
    bottom: containerRect.top + newTop + noRect.height,
  };

  const overlapsYes =
    futureNoRect.right + minDistanceFromYes > yesRect.left &&
    futureNoRect.left - minDistanceFromYes < yesRect.right &&
    futureNoRect.bottom + minDistanceFromYes > yesRect.top &&
    futureNoRect.top - minDistanceFromYes < yesRect.bottom;

  if (overlapsYes) {
    // Force vertical escape if too close to Yes
    newTop =
      noBtn.offsetTop +
      (noCenterY < yesRect.top ? -1 : 1) * moveDistance;
    newTop = clamp(newTop, 0, maxY);
  }

  noBtn.style.transition = "all 0.18s ease";
  noBtn.style.left = `${newLeft}px`;
  noBtn.style.top = `${newTop}px`;
}

// Detect cursor proximity EARLY
document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const distance = Math.hypot(
    e.clientX - centerX,
    e.clientY - centerY
  );

  if (distance < dangerRadius) {
    moveNoButtonAway(e.clientX, e.clientY);
  }
});

// YES button
yesBtn.addEventListener("click", () => {
  song.loop = true;
  song.play();

  page1.classList.add("hidden");
  page2.classList.remove("hidden");
});

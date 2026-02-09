const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const song = document.getElementById("loveSong");

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

const dangerRadius = 160;
const minGap = 30; // minimum space between buttons
let isMoving = false;

function getCenter(rect) {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

function moveNoButton(mouseX, mouseY) {
  if (isMoving) return;
  isMoving = true;

  const container = document.querySelector(".buttons");
  const containerRect = container.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();

  const noCenter = getCenter(noRect);

  // Direction away from cursor
  let dx = noCenter.x - mouseX;
  let dy = noCenter.y - mouseY;

  const length = Math.hypot(dx, dy) || 1;
  dx /= length;
  dy /= length;

  // Strong vertical bias
  dy *= 2;

  const moveDistance = 90;

  let newLeft = noBtn.offsetLeft + dx * moveDistance;
  let newTop = noBtn.offsetTop + dy * moveDistance;

  // Clamp to container
  const maxX = containerRect.width - noRect.width;
  const maxY = containerRect.height - noRect.height;

  newLeft = Math.max(0, Math.min(newLeft, maxX));
  newTop = Math.max(0, Math.min(newTop, maxY));

  // Prevent touching Yes button
  const futureNo = {
    left: containerRect.left + newLeft,
    right: containerRect.left + newLeft + noRect.width,
    top: containerRect.top + newTop,
    bottom: containerRect.top + newTop + noRect.height
  };

  const yes = yesRect;

  const overlaps =
    futureNo.right + minGap > yes.left &&
    futureNo.left - minGap < yes.right &&
    futureNo.bottom + minGap > yes.top &&
    futureNo.top - minGap < yes.bottom;

  if (overlaps) {
    // Force vertical-only escape away from Yes
    newTop =
      noBtn.offsetTop +
      (noCenter.y < yes.top ? -1 : 1) * moveDistance;
    newTop = Math.max(0, Math.min(newTop, maxY));
  }

  noBtn.style.transition = "top 0.25s ease, left 0.25s ease";
  noBtn.style.left = `${newLeft}px`;
  noBtn.style.top = `${newTop}px`;

  // Cooldown to stop jitter
  setTimeout(() => {
    isMoving = false;
  }, 250);
}

// Detect proximity BEFORE hover
document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();
  const center = getCenter(rect);

  const distance = Math.hypot(
    e.clientX - center.x,
    e.clientY - center.y
  );

  if (distance < dangerRadius) {
    moveNoButton(e.clientX, e.clientY);
  }
});

// YES button logic
yesBtn.addEventListener("click", () => {
  song.loop = true;
  song.currentTime = 0;
  song.play();

  page1.classList.add("hidden");
  page2.classList.remove("hidden");
});

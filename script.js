const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const song = document.getElementById("loveSong");

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

const dangerRadius = 150;
let canMove = true;

// Helper to move button smoothly
function moveNoButton() {
  if (!canMove) return;
  canMove = false;

  const container = document.querySelector(".buttons");
  const containerRect = container.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = containerRect.width - btnRect.width;
  const maxY = containerRect.height - btnRect.height;

  // Keep movement mostly vertical, limited horizontal
  const currentLeft = noBtn.offsetLeft;
  const currentTop = noBtn.offsetTop;

  const verticalShift = (Math.random() * 2 - 1) * 50; // up/down
  const horizontalShift = (Math.random() * 2 - 1) * 20; // small left/right

  let newLeft = currentLeft + horizontalShift;
  let newTop = currentTop + verticalShift;

  // Clamp within container
  newLeft = Math.max(0, Math.min(newLeft, maxX));
  newTop = Math.max(0, Math.min(newTop, maxY));

  noBtn.style.left = `${newLeft}px`;
  noBtn.style.top = `${newTop}px`;
  noBtn.style.transition = "all 0.2s ease";

  // Cooldown to prevent jitter
  setTimeout(() => {
    canMove = true;
  }, 200);
}

// Detect cursor proximity
document.addEventListener("mousemove", (e) => {
  const btnRect = noBtn.getBoundingClientRect();
  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;

  const distance = Math.hypot(
    e.clientX - btnCenterX,
    e.clientY - btnCenterY
  );

  if (distance < dangerRadius) {
    moveNoButton();
  }
});

// YES button logic
yesBtn.addEventListener("click", () => {
  song.loop = true;   // 🔁 repeat forever
  song.play();

  page1.classList.add("hidden");
  page2.classList.remove("hidden");
});

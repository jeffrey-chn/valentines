const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const song = document.getElementById("loveSong");

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

let dodgeCount = 0;
const dangerRadius = 150; // distance in pixels before it runs

function moveNoButton() {
  const container = document.querySelector(".buttons");
  const containerRect = container.getBoundingClientRect();

  const maxX = containerRect.width - noBtn.offsetWidth;
  const maxY = containerRect.height - noBtn.offsetHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;

  dodgeCount++;
  noBtn.style.transform = `scale(${scale})`;
  noBtn.style.transition = "all 0.15s ease";
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
  song.play();
  page1.classList.add("hidden");
  page2.classList.remove("hidden");
});

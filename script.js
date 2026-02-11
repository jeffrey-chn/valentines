const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttons = document.querySelector(".buttons");
const mainScreen = document.getElementById("main");
const finalScreen = document.getElementById("final");
const music = document.getElementById("music");

/* YES BUTTON */
yesBtn.addEventListener("click", () => {
  mainScreen.classList.add("hidden");
  finalScreen.classList.remove("hidden");

  music.currentTime = 0;
  music.play();
});

/* NO BUTTON – DODGE LOGIC */
buttons.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();

  const btnCenterX = rect.left + rect.width / 2;
  const btnCenterY = rect.top + rect.height / 2;

  const distance = Math.hypot(
    e.clientX - btnCenterX,
    e.clientY - btnCenterY
  );

  // Move early, before hover
  if (distance < 120) {
    moveNoButton();
  }
});

function moveNoButton() {
  const containerRect = buttons.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const padding = 20;

  const maxX = containerRect.width - btnRect.width - padding;
  const maxY = containerRect.height - btnRect.height - padding;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

/* LOOP MUSIC */
music.loop = true;

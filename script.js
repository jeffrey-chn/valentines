const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const song = document.getElementById("loveSong");

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

const dangerRadius = 130; // how close the cursor can get

function moveNoButton() {
  const container = document.querySelector(".buttons");
  const containerRect = container.getBoundingClientRect();

  const maxX = containerRect.width - noBtn.offsetWidth;
  const maxY = containerRect.height - noBtn.offsetHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  noBtn.style.transition = "all 0.08s ease";
}

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

yesBtn.addEventListener("click", () => {
  song.play();
  page1.classList.add("hidden");
  page2.classList.remove("hidden");
});

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const song = document.getElementById("loveSong");

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

let dodgeCount = 0;

noBtn.addEventListener("mouseover", () => {
  dodgeCount++;

  const container = document.querySelector(".buttons");
  const containerRect = container.getBoundingClientRect();

  const maxX = containerRect.width - noBtn.offsetWidth;
  const maxY = containerRect.height - noBtn.offsetHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;

  // Make it smaller every time
  const scale = Math.max(0.4, 1 - dodgeCount * 0.05);
  noBtn.style.transform = `scale(${scale})`;

  // Increase panic speed
  noBtn.style.transition = `all ${Math.max(0.05, 0.3 - dodgeCount * 0.03)}s`;
});

// YES button logic
yesBtn.addEventListener("click", () => {
  song.play();
  page1.classList.add("hidden");
  page2.classList.remove("hidden");
});

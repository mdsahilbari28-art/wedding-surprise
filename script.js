const weddingDate = new Date("2026-12-12T18:00:00");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const playMusicBtn = document.getElementById("playMusicBtn");
const audioEl = document.getElementById("bgMusic");
const songUpload = document.getElementById("songUpload");
const videoUpload = document.getElementById("videoUpload");
const songStatus = document.getElementById("songStatus");
const memoryVideo = document.getElementById("memoryVideo");
const openSurpriseBtn = document.getElementById("openSurpriseBtn");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

async function toggleMusic() {
  if (audioEl.paused) {
    try {
      await audioEl.play();
      playMusicBtn.textContent = "Pause Song";
    } catch (error) {
      playMusicBtn.textContent = "Tap to Play";
    }
  } else {
    audioEl.pause();
    playMusicBtn.textContent = "Play Our Song";
  }
}

playMusicBtn.addEventListener("click", toggleMusic);
openSurpriseBtn.addEventListener("click", () => {
  document.getElementById("surprise").scrollIntoView({ behavior: "smooth", block: "start" });
});

songUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const objectUrl = URL.createObjectURL(file);
  audioEl.src = objectUrl;
  audioEl.load();
  audioEl.play();
  playMusicBtn.textContent = "Pause Song";
  songStatus.textContent = `Uploaded: ${file.name}`;
});

videoUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const objectUrl = URL.createObjectURL(file);
  memoryVideo.src = objectUrl;
  memoryVideo.load();
  memoryVideo.play();
});

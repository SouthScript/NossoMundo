const music = document.getElementById("music");

const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const musicName = document.getElementById("musicName");

const player = document.querySelector(".music-player");

/* CONTADORES */

const daysCounter = document.getElementById("daysCounter");
const detailedCounter = document.getElementById("detailedCounter");

/* DATA DO NAMORO */

const startDate = new Date("2026-01-05");

/* CONTADOR */

function updateCounters(){

  const now = new Date();

  const diff = now - startDate;

  const days = Math.floor(
    diff / (1000 * 60 * 60 * 24)
  );

  daysCounter.innerHTML =
    `${days} dias juntos`;

  let years =
    now.getFullYear() -
    startDate.getFullYear();

  let months =
    now.getMonth() -
    startDate.getMonth();

  let day =
    now.getDate() -
    startDate.getDate();

  if(day < 0){

    months--;

    const previousMonth =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        0
      );

    day += previousMonth.getDate();
  }

  if(months < 0){

    years--;
    months += 12;
  }

  detailedCounter.innerHTML =
    `${years} ano(s), ${months} mês(es) e ${day} dia(s)`;

}

updateCounters();

/* PLAYLIST */

const songs = [

  {
    name:"Beginning",
    file:"assets/music/C418 - Beginning - Minecraft Volume Alpha.mp3"
  },

  {
    name: "Équinoxe",
    file:"assets/music/C418 - Équinoxe - Minecraft Volume Alpha(MP3_160K).mp3"
  },

  {
    name:"subwoofer lullaby",
    file:"assets/music/C418 - Subwoofer Lullaby - Minecraft Volume Alpha(MP3_160K).mp3"
  }

];

let currentSong = 0;
let isPlaying = false;

/* CARREGAR */

function loadSong(){

  music.src =
    songs[currentSong].file;

  musicName.innerHTML =
    songs[currentSong].name;
}

loadSong();

/* PLAY */

function playMusic(){

  music.play();

  isPlaying = true;

  playPauseBtn.innerHTML = "❚❚";

  player.classList.add("active");
}

/* PAUSE */

function pauseMusic(){

  music.pause();

  isPlaying = false;

  playPauseBtn.innerHTML = "▶";

  player.classList.remove("active");
}

/* AUTO PLAY NO PRIMEIRO TOQUE */

function autoPlay(){

  if(!isPlaying){

    playMusic();
  }

  document.removeEventListener(
    "click",
    autoPlay
  );

  document.removeEventListener(
    "touchstart",
    autoPlay
  );
}

document.addEventListener(
  "click",
  autoPlay
);

document.addEventListener(
  "touchstart",
  autoPlay
);

/* PLAY/PAUSE */

playPauseBtn.addEventListener(
  "click",
  () => {

    if(isPlaying){

      pauseMusic();

    } else {

      playMusic();
    }

  }
);

/* PRÓXIMA */

nextBtn.addEventListener(
  "click",
  () => {

    currentSong++;

    if(
      currentSong >= songs.length
    ){

      currentSong = 0;
    }

    loadSong();

    playMusic();

  }
);

/* ANTERIOR */

prevBtn.addEventListener(
  "click",
  () => {

    currentSong--;

    if(currentSong < 0){

      currentSong =
        songs.length - 1;
    }

    loadSong();

    playMusic();

  }
);

/* QUANDO A MÚSICA ACABAR */

music.addEventListener("ended", () => {

  currentSong++;

  if(currentSong >= songs.length){

    currentSong = 0;

  }

  loadSong();

  playMusic();

});
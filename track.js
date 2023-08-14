const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("playPauseBtn");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");
const nextIcon = document.getElementById("nextIcon");
const prevIcon = document.getElementById("prevIcon");
const progressBar = document.querySelector(".progress-bar");
const songTitleElement = document.getElementById("songTitle");
const albumImgElement = document.getElementById("albumImg");
const songList = document.getElementById("songList");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const songs = [
  {
    title: "11 Januari",
    audioSrc: "/projek/11-januari.mp3",
  },
  {
    title: "Nakal",
    audioSrc: "/projek/nakal.mp3",
  },
  {
    title: "Janji",
    audioSrc: "/projek/janji.mp3",
  },
];

let currentSongIndex = 0;

// Function to toggle play/pause of the audio
function togglePlay() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "inline";
  } else {
    audioPlayer.pause();
    playIcon.style.display = "inline";
    pauseIcon.style.display = "none";
  }
}

// Function to update the progress bar
function updateProgressBar() {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = `${progress}%`;
}

// Function to change the song and update the UI
function changeSong(index) {
  currentSongIndex = index;
  const selectedSong = songs[index];
  audioPlayer.src = selectedSong.audioSrc;
  songTitleElement.textContent = selectedSong.title;
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
}

// Function to generate the song list dynamically
function generateSongList() {
  songs.forEach((song, index) => {
    const songItem = document.createElement("p");
    songItem.textContent = `${index + 1}. ${song.title}`;
    songItem.addEventListener("click", () => changeSong(index));
    songList.appendChild(songItem);
  });
}

// Add event listeners
playPauseBtn.addEventListener("click", togglePlay);
audioPlayer.addEventListener("timeupdate", updateProgressBar);

// Generate the song list
generateSongList();

// Initialize the first song
changeSong(currentSongIndex);

// Add event listeners to the Next and Previous buttons
nextBtn.addEventListener("click", playNextSong);
prevBtn.addEventListener("click", playPreviousSong);

function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  changeSong(currentSongIndex);
  audioPlayer.play();
  nextIcon.style.display = "inline";

  // Reset nextIcon after a delay
  setTimeout(() => {
    nextIcon.style.display = "none";
  }, 2000);
}

function playPreviousSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  changeSong(currentSongIndex);
  audioPlayer.play();
  prevIcon.style.display = "inline";

  // Reset prevIcon after a delay
  setTimeout(() => {
    prevIcon.style.display = "none";
  }, 2000);
}

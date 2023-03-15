const video = document.querySelector("video");
const videoContainer = document.getElementById("videoContainer");
const videoController = document.getElementById("videoController");
const psBtn = videoController.querySelector("#playPauseBtn");
const currentTime = videoController.querySelector("#currentTime");
const totalTime = videoController.querySelector("#totalTime");
const timeline = videoController.querySelector("#timeline");
const volumeBtn = videoController.querySelector("#volume");
const volumeRange = videoController.querySelector("#volumeRange");
const fullScreenBtn = videoController.querySelector("#fullScreenBtn");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayAndStop = () => {
  if (video.paused) {
    video.play();
    psBtn.className = "fas fa-pause";
  } else {
    video.pause();
    psBtn.className = "fas fa-play";
  }
};

const timeFormat = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

const handleTotalTime = () => {
  if (Math.floor(video.duration) < 3600) {
    totalTime.innerText = timeFormat(Math.floor(video.duration)).substr(3);
  } else {
    totalTime.innerText = timeFormat(Math.floor(video.duration)).substr(0, 5);
  }
  timeline.max = Math.floor(video.duration);
};

const handleCurrentTIme = () => {
  if (Math.floor(video.currentTime) < 3600) {
    currentTime.innerText = timeFormat(Math.floor(video.currentTime)).substr(3);
  } else {
    currentTime.innerText = timeFormat(Math.floor(video.currentTime)).substr(
      0,
      5
    );
  }
  timeline.value = Math.floor(video.currentTime);
};

const handleTimeline = (event) => {
  const {
    target: { value }
  } = event;
  video.currentTime = value;
};

const handleSound = () => {
  if (video.muted) {
    video.muted = false;
    volumeRange.value = volumeValue;
    volumeBtn.className = "fas fa-volume-up";
  } else {
    video.muted = true;
    volumeRange.value = 0;
    volumeBtn.className = "fas fa-volume-mute";
  }
};

const handleVolume = (event) => {
  const {
    target: { value }
  } = event;
  if (video.muted) {
    video.muted = false;
    volumeBtn.className = "fas fa-volume-mute";
  }
  if (value === "0") {
    volumeBtn.className = "fas fa-volume-off";
  } else {
    volumeBtn.className = "fas fa-volume-up";
  }
  video.volume = volumeValue = value;
};

const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtn.className = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.className = "fas fa-compress";
  }
};

const handleKeyboard = (e) => {
  if (e.key === " ") {
    handlePlayAndStop();
  } else if (e.key === "f") {
    videoContainer.requestFullscreen();
    fullScreenBtn.className = "fas fa-compress";
  } else if (e.key === "Escape") {
    document.exitFullscreen();
    fullScreenBtn.className = "fas fa-expand";
  }
};

psBtn.addEventListener("click", handlePlayAndStop);
video.addEventListener("loadedmetadata", handleTotalTime);
video.addEventListener("timeupdate", handleCurrentTIme);
timeline.addEventListener("input", handleTimeline);
volumeBtn.addEventListener("click", handleSound);
volumeRange.addEventListener("input", handleVolume);
fullScreenBtn.addEventListener("click", handleFullScreen);
window.addEventListener("keyup", handleKeyboard);

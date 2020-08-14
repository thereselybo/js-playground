/* Get elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreen = player.querySelector(".fullscreen");


/* Build out functions */
function togglePlay() {
    if(video.paused) { //there is only a paused property on the video, not playing
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip); //parseFloat converts the value of skip into a true number, and edits the current time with said number
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;

}

// function rangeScrub(e) {
//     const scrubRange = (e.offsetX / this.offsetWidth);
//     // video[this.name] = scrubRange;
//     console.log(scrubRange);
// }

//extra challenge:
function toggleFullscreen() {
    if(document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        video.requestFullscreen();
    }
}



/* Hook up event listeners */
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach(button => button.addEventListener("click", skip))

ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));

let mousedown = false;

//for extra practice, add a mousemove listener to make the audio and playback rate change in realtime on mousemove rather than click, a la html5 canvas
// ranges.forEach(range => range.addEventListener("mousemove", (e) => mousedown && handleRangeUpdate(e)));
// ranges.forEach(range => range.addEventListener("mousedown", () => mousedown = true));
// ranges.forEach(range => range.addEventListener("mouseup", () => mousedown = false));

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e)); //if mousedown is true, it moves on to scrub
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);


//extra challenge:
function toggleFullscreen() {
    if(document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        video.requestFullscreen();
    }
}

fullscreen.addEventListener("click", toggleFullscreen);

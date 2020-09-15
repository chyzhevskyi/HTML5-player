let video = document.querySelector(".video");
let player = document.querySelector(".player");
let play = document.querySelector(".play");
let video_stop = document.querySelector(".stop");
let fullscreen = document.querySelector(".fullscreen");
let mute = document.querySelector(".mute");
let video_volume = document.querySelector(".volume");
let speed = document.querySelector(".speed");
let progress = document.querySelector(".progress");
let current_time = document.querySelector(".current-time");
let duration_time = document.querySelector(".duration-time");

function Play() {
    if (video.paused) {
        video.play();
        play.setAttribute("style", "background: url('../img/pause.png');");
    }
    else {
        video.pause();
        play.setAttribute("style", "background: url('../img/play.png');");
    }
}
function VideoStop() {
    video.pause();
    video.currentTime = 0;
}
function FullScreen() {
    if (!document.fullscreenElement) {
        player.requestFullscreen();
        video.setAttribute("style", "height: 93%; width: 100%; margin: 0");
        progress.setAttribute("style", "width: 700px;");
    }
    else {
        document.exitFullscreen();
        video.setAttribute("style", "height: 480px%; width: 100%; margin: 50px 0px 0px 0px");
        progress.setAttribute("style", "width: 300px;");
    }
}
function FullscreenExit() {
    if (!document.fullscreenElement) {
        progress.setAttribute("style", "width: 300px;");
    }
} 
function Mute() {
    video.volume = 0;
    video_volume.value = 0;
}
function Volume() {
    video.volume = video_volume.value / 100;
}
function Speed() {
    if (speed.value == 0.5) {
        video.playbackRate = 0.5;
    }
    else
        if (speed.value == 1) {
            video.playbackRate = 1;
        }
        else
            if (speed.value == 2) {
                video.playbackRate = 2;
            }
}
function Progress() {
    let duration = video.duration;
    let current = video.currentTime;
    progress.value = 100 * current / duration;
    Time(duration, current);
}
function Rewind() {
    let x = this.offsetWidth;
    let dx = event.offsetX;
    this.value = 100 * dx / x;
    video.pause();
    video.currentTime = video.duration * dx / x;
    video.play();
}
function Time (dt,ct) {
    let hours = Math.floor(dt / 60 / 60);
    let minutes = Math.floor(dt / 60) - (hours * 60);
    let seconds = Math.floor(dt % 60);
    if (hours < 10) duration_time.innerHTML=`0${hours}:`; else duration_time.innerHTML=`${hours}:`;
    if (minutes < 10) duration_time.innerHTML+=`0${minutes}:`; else duration_time.innerHTML+=`${minutes}:`;
    if (seconds < 10) duration_time.innerHTML+=`0${seconds}`; else duration_time.innerHTML+=`${seconds}`;
    let current_hours = Math.floor(ct / 60 / 60);
    let current_minutes = Math.floor(ct / 60) - (hours * 60);
    let current_seconds = Math.floor(ct % 60);
    if (current_hours < 10) current_time.innerHTML=`0${current_hours}:`; else current_time.innerHTML=`${current_hours}:`;
    if (current_minutes < 10) current_time.innerHTML+=`0${current_minutes}:`; else current_time.innerHTML+=`${current_minutes}:`;
    if (current_seconds < 10) current_time.innerHTML+=`0${current_seconds}`; else current_time.innerHTML+=`${current_seconds}`;
}
play.addEventListener("click", Play);    
video.addEventListener("click", Play);
video_stop.addEventListener("click", VideoStop);
fullscreen.addEventListener("click", FullScreen);
document.addEventListener('fullscreenchange', FullscreenExit);
mute.addEventListener("click", Mute);
video_volume.addEventListener("click", Volume);
speed.addEventListener("click", Speed);
progress.addEventListener("click", Rewind);
video.ontimeupdate = Progress;
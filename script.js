const videos = [
    {
        'name' : 'My First Video 1',
        'src' : './video/video (1).mp4'
    },
    {
        'name' : 'My First Video 2',
        'src' : './video/video (2).mp4'
    },
    {
        'name' : 'My First Video 3',
        'src' : './video/video (3).mp4'
    },
    {
        'name' : 'My First Video 4',
        'src' : './video/video (4).mp4'
    },
    {
        'name' : 'My First Video 5',
        'src' : './video/video (5).mp4'
    },
];
const video = document.createElement('video');
const miniSize = document.querySelector('.box');
const exit = document.querySelector('.exit');
const TopBoxBtn = document.querySelector('.more');
const videoBtn = document.querySelector('.video_btn');
const backPage = document.querySelector('.backPage');
const container = document.querySelector('.container');
const controls = document.querySelector('.controls');
const topControls = document.querySelector('.rightControls');
const menu = document.querySelector('.menu');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.bar');
const videoTitle = document.querySelector('.videoTitle');
const menuBox = document.querySelector('.menuBox');
const timerBox = document.querySelector('.timerBox');
const icons = document.querySelectorAll('.i');
const Ticons = document.querySelectorAll('.ticon');

const volInput = document.getElementById('volInput');
const briInput = document.getElementById('briInput');
const sprInput = document.getElementById('spreedSelection');
const mlist1 = document.getElementById('vb0');
const HourInput = document.getElementById('houre');
const MinuteInput = document.getElementById('minute');
const SecondInput = document.getElementById('second');
const Start = document.getElementById('start');
const Stop = document.getElementById('stop');
const Reset = document.getElementById('reset');

const back = icons[0];
const lock = icons[1];
const playList = icons[2];
const volume = icons[3];
const prev = icons[4];
const playA = icons[5];
const next = icons[6];
const prevFast = icons[7];
const nextFast = icons[8];
const zoom = icons[9];
const pipMode = icons[10];

const mode = Ticons[0];
const mute = Ticons[3];
const sleep = Ticons[4];
const spreed = Ticons[9];
const brightness = Ticons[10];

let currentVideo = 0;
let isTog = false;
let isRepeat = false;
let isShuffle = false;
let isMode = false;
let isMute = false;
let isSleep = false;

let MillSecond = null,Second = null,Minute = null,Hours = null;

function loadVideo(){
    videoTitle.textContent = videos[currentVideo].name;
    video.src = videos[currentVideo].src;
    container.append(video);
    video.load();
}
function isVideo(){
    isTog ? Pause() : Play();
}
function Play(){
    video.play();
    isTog = true;
    video.addEventListener('ended',nextPlay);
    document.querySelector('.play').classList.add('fa-pause');
    document.querySelector('.play').classList.remove('fa-play');
}
function Pause(){
    video.pause();
    isTog = false;
    document.querySelector('.play').classList.remove('fa-pause');
    document.querySelector('.play').classList.add('fa-play');
}
const nextPlay = () => {
    if(currentVideo < videos.length - 1 && isShuffle === false){
        currentVideo += 1;
    }else if(currentVideo < videos.length - 1 && isShuffle == true){
        let videoRandom = Math.floor(Math.random() * videos.length);
        currentVideo = videoRandom;
        Play();
    }else{
        currentVideo = 0;
    }
    // loadVideo();
    loadVideo()
    Play();
}
const prevPlay = () => {
    if(currentVideo < videos.length){
        currentVideo -= 1;
    }else{
        currentVideo -= 1;
    }
    loadVideo();
    Play();
}
const formateTime = (time) => {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    return `${minute < 10 ? '0' : ''}${minute} : ${second < 10 ? '0' : ''}${second}`;
}
const Progressor = () => {
    const {currentTime : current,duration} = video;
    const percentance = (current / duration) * 100;
    progressBar.style.width = `${percentance}%`;
}

loadVideo();
exit.addEventListener('click',() => {
    backPage.classList.remove('eActive');
    container.classList.remove('vActive');
    videoBtn.classList.remove('vActive');
    video.pause();
});
miniSize.addEventListener('click',() => {
    backPage.classList.toggle('msActive');
    container.classList.toggle('zoomActive');
});
videoBtn.addEventListener('click',() => {
    videoBtn.classList.add('vActive');
    container.classList.add('vActive');
    back.addEventListener('click',() => {
        videoBtn.classList.remove('vActive');
        container.classList.remove('vActive');
        video.pause();
    })
});
video.addEventListener('timeupdate',Progressor);
TopBoxBtn.addEventListener('click',() => {
    topControls.classList.toggle('tActive');
});
menu.addEventListener('click',() => {
    menu.classList.add('active0');
    menuBox.classList.add('active0');
    document.querySelector('.Mxmark').addEventListener('click',() => {
        menuBox.classList.remove('active0');
        menu.classList.remove('active0');
    })
});
next.addEventListener('click',nextPlay);
playA.addEventListener('click',isVideo);
prev.addEventListener('click',prevPlay);
progress.addEventListener('click',(event) => {
    let ProgressorLeft = event.clientX - progress.getBoundingClientRect().left;
    let percentance = (ProgressorLeft / progress.clientWidth) * 100;
    progressBar.style.width = `${percentance}%`;
    let videoDuration = video.duration;
    let seekTime = (percentance / 100) * videoDuration;
    video.currentTime = seekTime;
});
nextFast.addEventListener('click',() => video.currentTime +=10 );
prevFast.addEventListener('click',() => video.currentTime -=10 );
lock.addEventListener('click',() => {
    const open = document.querySelector('.lockOpen');
    controls.classList.add('lockActive');
    open.style.left = `3%`;
    open.style.zIndex = 3;
 open.addEventListener('click',() => {
    controls.classList.remove('lockActive');
    open.style.left = `-6%`;
    })
});
playList.addEventListener('click',() => {
    const xmark = document.querySelector('.xmark');
    document.querySelector('.listBox').classList.add('listBoxActive');
xmark.addEventListener('click',() => {
    document.querySelector('.listBox').classList.remove('listBoxActive');
});
});
volume.addEventListener('click',() => {
    document.querySelector('.volumeBox').classList.toggle('volBoxActive');
});
brightness.addEventListener('click',() => {
    document.querySelector('.birghtBox').classList.toggle('briBoxActive');
});
volInput.addEventListener('input',(e) => {
    video.volume = e.target.value / 100;
});
volInput.addEventListener('wheel',(w) => {
    w.preventDefault();
    volInput.value = parseInt(volInput.value) + (w.deltaY > 0 ? 1 : -1);
    volInput.value = Math.min(Math.max(volInput.value, volInput.min),volInput.max);
    video.volume = volInput.value / 100;
    volInput.dispatchEvent(new Event('input'));
});
briInput.addEventListener('input',(e) => {
    video.style.filter = `brightness(${e.target.value}%)`;
});
briInput.addEventListener('wheel',(w) => {
    w.preventDefault();
    briInput.value = parseInt(briInput.value) + (w.deltaY > 0 ? 1 : -1);
    briInput.value = Math.min(Math.max(briInput.value, briInput.min),briInput.max);
    video.style.filter = `brightness(${briInput.value}%)`
    briInput.dispatchEvent(new Event('input'));
});
spreed.addEventListener('click',() => {
    sprInput.classList.toggle('sprActive')
});
sprInput.addEventListener('change',(e) => {
 let value = parseFloat(e.target.value);
   if(value == 0){
    video.playbackRate = 1;
    video.playbackRate += .1;
}
   else if(value == 1){
    video.playbackRate = 1;
    video.playbackRate += .5;
}
   else if(value == 2){
    video.playbackRate = 1;
    video.playbackRate += .75;
}
   else if(value == 3){
    video.playbackRate = 1;
    video.playbackRate += 0;
}
   else if(value == 4){
    video.playbackRate = 1;
    video.playbackRate += 1.25;
}
   else if(value == 5){
    video.playbackRate = 1;
    video.playbackRate += 1.5;
}
   else if(value == 6){
    video.playbackRate = 1;
    video.playbackRate += 3;
}
   else{
    console.log('Good Hacking');
 }
 console.log(video.playbackRate);
});
zoom.addEventListener('click',() => {
    container.classList.toggle('zoomActive');
    controls.classList.toggle('zoomActive');
    backPage.classList.toggle('zoomActive');
});
mlist1.addEventListener('change',(e) => {
    if(mlist1.checked){
        backPage.classList.add('eActive');
    }else{
        backPage.classList.remove('eActive');
    }
});
videos.forEach(item => {
    const ul = document.getElementById('listItem');
    const li = document.createElement('li');
    li.innerHTML =
    `
    <video id="lVideo" src="${item.src}"></video>
    <b class="listTile">${item.name}</b>
    <i class="listPlay fa "></i>
    `;
    ul.append(li);
});
const lis = document.querySelectorAll('li');
lis.forEach((li,i) => {
    const listVide = document.querySelectorAll('#lVideo');
    li.addEventListener('mouseenter',() => {
        listVide[i].play();
        listVide[i].classList.add('listActive');
        listVide[i].volume = 0;
        listVide[i].currentTime += 10;
    });
    li.addEventListener('mouseleave',() => {      
        listVide[i].pause();
        listVide[i].classList.remove('listActive');
    });
    li.addEventListener('click',() => {   
        currentVideo = i;
        currentActive = listVide[li];
        loadVideo();
        Play();
    });
});
controls.addEventListener('dblclick',(e) => {
   let cX = e.clientX - e.currentTarget.offsetLeft;
   const bW = e.currentTarget.offsetWidth;
   const sW = bW / 3;
   if(cX < sW) video.currentTime -=10;
   else if(cX > sW * 2) video.currentTime +=10;
   else isVideo();
});
document.addEventListener('keydown',(e) => {
    const keyName = e.key;
    if(keyName === ' '){isVideo()}
    else if(keyName === 'ArrowLeft'){prevPlay()}
    else if(keyName === 'ArrowRight'){nextPlay()}
    else if(keyName === 'ArrowUp'){video.currentTime +=10}
    else if(keyName === 'ArrowDown'){video.currentTime -=10}
    // else if(keyName === 'v'){}
    // console.log(keyName);
});

// Top Controls setup
mode.addEventListener('click',() => {
const i = document.querySelectorAll('.ii');
    if(isMode){
        mode.children[0].style.color = 'black';
        for(let x of i){
            x.style.color = '#fff';
        }
        progress.style.background = '#fff';
        videoTitle.style.color = '#fff';
        isMode = false;
    }else{
        mode.children[0].style.color = 'white';
        for(let x of i){
            x.style.color = '#000';
        }
        progress.style.background = '#000';
        videoTitle.style.color = '#000';
        isMode = true;
    }
});
mute.addEventListener('click',() => {
    if(!isMute){
        video.volume = 0;
        mute.children[0].style.color = 'red';
        isMute = true;
    }else{
        mute.children[0].style.color = 'white';
        video.volume = 1;
        isMute = false;
    }
});
// sleep.addEventListener('click',() => {
//    timerBox.classList.toggle('timerActive')
// }); next update

//----------------------------- important---------------------------------
//Many Btn Is Now Not Working.Next update is Do Some Work And Also Many Place Need To Update Or Upgrade.Now I Am Just ShowIng my Skill NExt Time New Model,Design,Method,Works Will Be change.....In Sa Allah!
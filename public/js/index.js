document.addEventListener('DOMContentLoaded', function() {
    
    const homeBtn = document.getElementById('home-btn');
    const merchBtn = document.getElementById('merch-btn');
    const directoryBtn = document.getElementById('directory-btn');

    homeBtn.addEventListener('click', function() {
        window.location.href = '/'; 
    });

    merchBtn.addEventListener('click', function() {
        window.location.href = '/merch'; 
    });

    directoryBtn.addEventListener('click', function() {
        window.location.href = '/directory'; 
    });

    let bannerVideo = document.getElementById('banner-video');
    if (bannerVideo) {
        bannerVideo.playbackRate = 1.0;
    }


    // YouTube IFrame API
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});

let players = [];
let currentVideoIndex = 0;

function onYouTubeIframeAPIReady() {
    const videoContainers = document.querySelectorAll('.video-container');
    videoContainers.forEach((container, index) => {
        const iframe = container.querySelector('iframe');
        players[index] = new YT.Player(iframe, {
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    });
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        playNextVideo();
    }
}

function playNextVideo() {
    if (players.length > 0) {
        const nextVideoIndex = (currentVideoIndex + 1) % players.length;
        players[currentVideoIndex].pauseVideo();
        players[nextVideoIndex].playVideo();
        currentVideoIndex = nextVideoIndex;
    }
}
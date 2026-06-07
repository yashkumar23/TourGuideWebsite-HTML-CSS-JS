function toggleMenu()
{
    const menuToggle = document.querySelector('.toggle');
    menuToggle.classList.toggle('active')
}

function toggleVideo() {
    const section = document.querySelector('section');
    const video = document.getElementById('background-video');
    const playBtn = document.getElementById('play-video-btn');
    const stopBtn = document.getElementById('stop-video-btn');

    // Toggle the 'video-active' class on the section
    section.classList.toggle('video-active');

    if (section.classList.contains('video-active')) {
        // Video is now active (playing as background)
        video.play();
        playBtn.style.display = 'none';
        stopBtn.style.display = 'flex';
    } else {
        // Video is now inactive (stopped)
        video.pause();
        video.currentTime = 0; // Reset video to start
        playBtn.style.display = 'flex';
        stopBtn.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const logoContainer = document.querySelector('#logoContainer');
    const video = document.querySelector('#logo');
    function playVideo() {
        video.play();
    }

    function pauseVideo() {
        video.pause();
        video.currentTime = 0;
    }

    logoContainer.addEventListener('mouseenter', playVideo);
    logoContainer.addEventListener('mouseleave', pauseVideo);

    // Add touch support for mobile devices
    logoContainer.addEventListener('touchstart', playVideo);
    logoContainer.addEventListener('touchend', pauseVideo);
});
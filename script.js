// Customized YT thumbnail preview

//This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//This function creates an <iframe> (and YouTube player)
//after the API code downloads.
var player;
let playerReady = false;
let thumbnail = document.getElementById('thumbnail');
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'ntqivT3Nklg',
    playerVars: {
      'playsinline': 1,
    },
    events: {
      'onReady': () => { playerReady = true; }
    }
  });
}

thumbnail.addEventListener('click', playVideo);
async function playVideo() {
  if (!playerReady) {
    console.log('waiting...');
    await until(p => playerReady);
  }

  console.log('playing!');
  if (thumbnail)
    thumbnail.remove();
  player.playVideo();
}

function until(conditionFunction) {
  const poll = resolve =>
    conditionFunction() ? resolve() : setTimeout(_ => poll(resolve), 400);
  return new Promise(poll);
}



// LOGO MOVES ON HOVER
let width = window.innerWidth;
let height = window.innerHeight;

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

// IMAGE LIGHTBOX

// Open the Modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
  }
  
  // Close the Modal
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }
  
  var slideIndex = 1;
  showSlides(slideIndex);
  
  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    captionText.innerHTML = dots[slideIndex-1].alt;
  }

  // MENU SIDEBAR

  /* Set the width of the side navigation to 250px */
function openNav() {
  if (width<450){
    document.getElementById("navBar").style.width = "100vw";
  }
  else{
    document.getElementById("navBar").style.width = "30vw";
  }
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("navBar").style.width = "0";
}



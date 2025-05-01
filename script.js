 // MENU SIDEBAR

 function openNav() {
  // Get the current window width each time the function is called
  const currentWidth = window.innerWidth

  if (currentWidth < 600) {
    document.getElementById("navBar").style.width = "100vw"
    document.getElementById("navBar").classList.add("open")
  } else {
    document.getElementById("navBar").style.width = "30vw"
  }
}

function closeNav() {
  document.getElementById("navBar").style.width = "0"
  document.getElementById("navBar").classList.remove("open")
}

// Add this to update width variable when window is resized
window.addEventListener("resize", () => {
  // This ensures the menu responds correctly if the window is resized while the menu is open
  if (document.getElementById("navBar").style.width !== "0") {
    openNav()
  }
})

// Customized YT thumbnail preview
// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script")
tag.src = "https://www.youtube.com/iframe_api"
var firstScriptTag = document.getElementsByTagName("script")[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

// Check if thumbnail element exists before adding event listener
const thumbnail = document.getElementById("thumbnail")
let playerReady = false
let player

// Only set up YouTube player if the thumbnail exists
if (thumbnail) {
  thumbnail.addEventListener("click", playVideo)

  // This function will be called by the YouTube API
  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player("player", {
      height: "390",
      width: "640",
      videoId: "ntqivT3Nklg",
      playerVars: {
        playsinline: 1,
      },
      events: {
        onReady: () => {
          playerReady = true
        },
      },
    })
  }

  async function playVideo() {
    if (!playerReady) {
      console.log("waiting...")
      await until((p) => playerReady)
    }

    console.log("playing!")
    if (thumbnail) thumbnail.remove()
    player.playVideo()
  }

  function until(conditionFunction) {
    const poll = (resolve) => (conditionFunction() ? resolve() : setTimeout((_) => poll(resolve), 400))
    return new Promise(poll)
  }
}

// LOGO MOVES ON HOVER

document.addEventListener('DOMContentLoaded', () => {
  // Load the footer
  fetch('footer.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load footer: ${response.statusText}`);
      }
      return response.text();
    })
    .then(data => {
      console.log(data); // Log the fetched content

      document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(error => {
      console.error(error);
      document.getElementById('footer-placeholder').innerHTML = `
        <footer>
          <p>Error loading footer content.</p>
        </footer>
      `;
    });

  // Load the sidebar
  fetch('sidebar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('sidebar-placeholder').innerHTML = data;
    });

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

 



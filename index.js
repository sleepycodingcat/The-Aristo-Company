// TOOLTIP THAT FOLLOWS CURSOR LANDING PAGE

var tooltip = document.querySelectorAll('.tooltiptext');

document.addEventListener('mousemove', fn, false);

function fn(e) {
    for (var i=tooltip.length; i--;) {
        tooltip[i].style.left = e.pageX-150 + 'px';
        tooltip[i].style.top = e.pageY-300 + 'px';
    }
}

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

  // LOGO MOVES ON HOVER

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
  
   
  
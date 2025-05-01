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
  
   
  
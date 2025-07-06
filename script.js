//  // Wait for everything to load
//  window.addEventListener('load', function() {
//   // Minimum show time (1500ms) before fading out
//   setTimeout(function() {
//     document.body.classList.add('loaded');
//     // Remove after fade completes (500ms)
//     setTimeout(function() {
//       document.querySelector('.aristo-preloader').remove();
//     }, 500);
//   }, 1500);
// }); 
 

// // // Customized YT thumbnail preview
// // // This code loads the IFrame Player API code asynchronously.
// // var tag = document.createElement("script")
// // tag.src = "https://www.youtube.com/iframe_api"
// // var firstScriptTag = document.getElementsByTagName("script")[0]
// // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

// // // Check if thumbnail element exists before adding event listener
// // const thumbnail = document.getElementById("thumbnail")
// // let playerReady = false
// // let player

// // // Only set up YouTube player if the thumbnail exists
// // if (thumbnail) {
// //   thumbnail.addEventListener("click", playVideo)

// //   // This function will be called by the YouTube API
// //   window.onYouTubeIframeAPIReady = () => {
// //     player = new YT.Player("player", {
// //       height: "390",
// //       width: "640",
// //       videoId: "ntqivT3Nklg",
// //       playerVars: {
// //         playsinline: 1,
// //       },
// //       events: {
// //         onReady: () => {
// //           playerReady = true
// //         },
// //       },
// //     })
// //   }

// //   async function playVideo() {
// //     if (!playerReady) {
// //       console.log("waiting...")
// //       await until((p) => playerReady)
// //     }

// //     console.log("playing!")
// //     if (thumbnail) thumbnail.remove()
// //     player.playVideo()
// //   }

// //   function until(conditionFunction) {
// //     const poll = (resolve) => (conditionFunction() ? resolve() : setTimeout((_) => poll(resolve), 400))
// //     return new Promise(poll)
// //   }
// // }

// // window.addEventListener('load', function() {
// //   setTimeout(function() {
// //     document.body.classList.add('loaded');
// //     setTimeout(function() {
// //       document.querySelector('.aristo-preloader').style.display = 'none';
// //     }, 500);
// //   }, 1500);
// // });




// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  // Load sidebar first
  await loadSidebar()

  // Add global event listeners
  document.addEventListener("click", handleOutsideClick)
  document.addEventListener("keydown", handleEscapeKey)
  document.addEventListener("touchstart", handleTouchStart)

})

// Preloader functionality
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Ensure sidebar is properly closed on page load
  const sidebar = document.getElementById("navBar")
  if (sidebar) {
    sidebar.style.width = "0"
    sidebar.classList.remove("open")
    sidebar.style.transform = "translateX(100%)"
  }

  sidebarOpen = false
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
    const video = document.querySelector('#videoLogo');
    
    
    function playVideo() {
      // Only play if video is visible
      if (window.getComputedStyle(video).display !== 'none') {
        video.play();
      }
    }

    function pauseVideo() {
      // Only pause if video is visible
      if (window.getComputedStyle(video).display !== 'none') {
        video.pause();
        video.currentTime = 0;
      }
  }

    logoContainer.addEventListener('mouseenter', playVideo);
    logoContainer.addEventListener('mouseleave', pauseVideo);
});

// //  var tag = document.createElement('script');
// //         tag.src = "https://www.youtube.com/iframe_api";
// //         var firstScriptTag = document.getElementsByTagName('script')[0];
// //         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// //         let featuredPlayer;
// //         window.onYouTubeIframeAPIReady = function() {
// //             featuredPlayer = new YT.Player('featuredPlayer', {
// //                 height: '100%',
// //                 width: '100%',
// //                 videoId: 'ntqivT3Nklg',
// //                 playerVars: {
// //                     'playsinline': 1
// //                 },
// //                 events: {
// //                     'onReady': onPlayerReady
// //                 }
// //             });
// //         }

// //         function onPlayerReady(event) {
// //             document.getElementById('featuredThumbnail').addEventListener('click', function() {
// //                 this.style.display = 'none';
// //                 event.target.playVideo();
// //             });
// //         }

// //         // Lightbox functionality
// //         document.addEventListener('DOMContentLoaded', function() {
// //             const filmItems = document.querySelectorAll('.masonry-item');
// //             const lightbox = document.getElementById('filmLightbox');
// //             const closeBtn = document.querySelector('.close-btn');
// //             const lightboxPlayer = document.getElementById('lightboxPlayer');
// //             const lightboxTitle = document.getElementById('lightboxTitle');
// //             const lightboxDesc = document.getElementById('lightboxDesc');
            
// //             filmItems.forEach(item => {
// //                 item.addEventListener('click', function() {
// //                     const videoId = this.getAttribute('data-id');
// //                     const title = this.getAttribute('data-title');
// //                     const desc = this.getAttribute('data-desc');
                    
// //                     lightboxPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
// //                     lightboxTitle.textContent = title;
// //                     lightboxDesc.textContent = desc;
                    
// //                     lightbox.style.display = 'flex';
// //                     document.body.style.overflow = 'hidden';
// //                 });
// //             });
            
// //             closeBtn.addEventListener('click', closeLightbox);
// //             lightbox.addEventListener('click', function(e) {
// //                 if (e.target === lightbox) closeLightbox();
// //             });
            
// //             function closeLightbox() {
// //                 lightbox.style.display = 'none';
// //                 lightboxPlayer.src = '';
// //                 document.body.style.overflow = 'auto';
// //             }
// //         });
 



// Initialize PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';

// Function to render PDF
function renderPDF(pdfUrl, containerId) {
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    
    loadingTask.promise.then(function(pdf) {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Clear previous content
        
        // Loop through all pages and render them
        for (let i = 1; i <= pdf.numPages; i++) {
            pdf.getPage(i).then(function(page) {
                // Calculate scale to fit container width
                const containerWidth = container.clientWidth - 40;
                const unscaledViewport = page.getViewport({ scale: 1 });
                const scale = Math.min(1.5, containerWidth / unscaledViewport.width);
                const viewport = page.getViewport({ scale: scale });
                
                // High-DPI setup
                const dpi = window.devicePixelRatio || 1;
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                
                // Set dimensions
                canvas.width = viewport.width * dpi;
                canvas.height = viewport.height * dpi;
                canvas.style.width = viewport.width + 'px';
                canvas.style.height = viewport.height + 'px';
                canvas.style.display = 'block';
                canvas.style.margin = '0 auto 20px';
                
                // Scale context
                context.scale(dpi, dpi);
                
                // Render page
                page.render({
                    canvasContext: context,
                    viewport: viewport
                });
                
                container.appendChild(canvas);
                
                // Add divider between pages (except last)
                if (i < pdf.numPages) {
                    const divider = document.createElement('div');
                    divider.style.height = '1px';
                    divider.style.background = '#f0f0f0';
                    divider.style.margin = '20px auto';
                    divider.style.width = '80%';
                    container.appendChild(divider);
                }
            });
        }
    }).catch(function(error) {
        console.error('PDF loading error:', error);
        document.getElementById(containerId).innerHTML = `
            <div class="pdf-error">
                <p>Error loading PDF document.</p>
                <a href="${pdfUrl}" download class="btn">Download PDF</a>
            </div>
        `;
    });
}

// Load both PDFs when page loads
window.addEventListener('load', function() {
    renderPDF('../PDF files/Unit 1 Learner Declaration.pdf', 'pdf-viewer-container-1');
    renderPDF('../PDF files/Unit 4 Learner Declaration.pdf', 'pdf-viewer-container-4');
});

// Handle window resize
window.addEventListener('resize', function() {
    renderPDF('../PDF files/Unit 1 Learner Declaration.pdf', 'pdf-viewer-container-1');
    renderPDF('../PDF files/Unit 4 Learner Declaration.pdf', 'pdf-viewer-container-4');
});


// Check if device is mobile
function checkMobile() {
  isMobile = window.innerWidth <= 600
}

// Initialize mobile check
checkMobile()
window.addEventListener("resize", checkMobile)

// Load sidebar from external file
async function loadSidebar() {
  try {
    const response = await fetch("../Media Pages/sidebar.html") // Adjust path as needed
    const sidebarHTML = await response.text()

    // Insert sidebar into placeholder
    const placeholder = document.getElementById("sidebar-placeholder")
    if (placeholder) {
      placeholder.innerHTML = sidebarHTML
    }

    // Initialize sidebar after loading
    initializeSidebar()
  } catch (error) {
    console.error("Error loading sidebar:", error)
  }
}

// Initialize sidebar functionality after it's loaded
function initializeSidebar() {
  const sidebar = document.getElementById("navBar")

  if (!sidebar) {
    console.error("Sidebar not found after loading")
    return
  }

  // Ensure sidebar starts closed
  sidebar.style.width = "0"
  sidebar.classList.remove("open")
  sidebar.style.transform = "translateX(100%)"

  // Add event listeners for sidebar links (close on click for mobile)
  const sidebarLinks = sidebar.querySelectorAll("a")
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (isMobile) {
        closeNav()
      }
    })
  })
}

// Open sidebar function
function openNav() {
  const sidebar = document.getElementById("navBar")
  const body = document.body

  if (!sidebar) {
    console.error("Sidebar not found")
    return
  }

  sidebarOpen = true

  if (isMobile) {
    sidebar.style.width = "100%"
    // Prevent body scroll on mobile
    body.style.overflow = "hidden"
    body.style.position = "fixed"
    body.style.width = "100%"
    body.style.top = `-${window.scrollY}px`
  } else {
    sidebar.style.width = "40vw"
  }

  sidebar.classList.add("open")
  sidebar.style.transform = "translateX(0)"
}

// Close sidebar function
function closeNav() {
  const sidebar = document.getElementById("navBar")
  const body = document.body

  if (!sidebar) {
    console.error("Sidebar not found")
    return
  }

  sidebarOpen = false
  sidebar.style.width = "0"
  sidebar.classList.remove("open")
  sidebar.style.transform = "translateX(100%)"

  // Restore body scroll and position
  if (isMobile) {
    const scrollY = body.style.top
    body.style.overflow = "auto"
    body.style.position = "static"
    body.style.width = "auto"
    body.style.top = ""

    // Restore scroll position
    if (scrollY) {
      window.scrollTo(0, Number.parseInt(scrollY || "0") * -1)
    }
  }
}

// Close sidebar when clicking outside (only on mobile)
function handleOutsideClick(event) {
  const sidebar = document.getElementById("navBar")
  const menuIcon = document.getElementById("menuIcon")

  if (!sidebar || !menuIcon || !sidebarOpen) return

  // Check if click is outside sidebar and menu icon
  if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
    closeNav()
  }
}

// Close sidebar on escape key
function handleEscapeKey(event) {
  if (event.key === "Escape" && sidebarOpen) {
    closeNav()
  }
}

// Prevent touch events from interfering with sidebar
function handleTouchStart(event) {
  const sidebar = document.getElementById("navBar")
  const menuIcon = document.getElementById("menuIcon")

  if (!sidebar || !menuIcon) return

  // If sidebar is closed and touch is not on menu icon, ensure it stays closed
  if (!sidebarOpen && !menuIcon.contains(event.target)) {
    sidebar.style.width = "0"
    sidebar.classList.remove("open")
    sidebar.style.transform = "translateX(100%)"
  }
}

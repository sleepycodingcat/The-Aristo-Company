 // Wait for everything to load
 window.addEventListener('load', function() {
  // Minimum show time (1500ms) before fading out
  setTimeout(function() {
    document.body.classList.add('loaded');
    // Remove after fade completes (500ms)
    setTimeout(function() {
      document.querySelector('.aristo-preloader').remove();
    }, 500);
  }, 1500);
}); 
 
 
 // MENU SIDEBAR
let touchStartX = 0;
let touchEndX = 0;

function openNav() {
  const currentWidth = window.innerWidth;
  const navBar = document.getElementById("navBar");
  
  if (currentWidth < 600) {
    navBar.style.width = "100vw";
    navBar.classList.add("open");
  } else {
    navBar.style.width = "30vw";
  }
  
  // Prevent body scrolling when sidebar is open
  document.body.style.overflow = "hidden";
}

function closeNav() {
  const navBar = document.getElementById("navBar");
  navBar.style.width = "0";
  navBar.classList.remove("open");
  
  // Re-enable body scrolling
  document.body.style.overflow = "auto";
}

// Add touch event listeners to prevent accidental swipes from opening sidebar
document.addEventListener('touchstart', function(e) {
  touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

document.addEventListener('touchend', function(e) {
  touchEndX = e.changedTouches[0].screenX;
  // Only consider it a swipe if it's a significant movement
  if (Math.abs(touchEndX - touchStartX) > 50) {
    // If swiping right from very left edge, prevent default to avoid opening sidebar
    if (touchStartX < 20 && touchEndX > touchStartX) {
      e.preventDefault();
    }
  }
}, {passive: false});

// Update sidebar width on resize
window.addEventListener("resize", () => {
  const navBar = document.getElementById("navBar");
  if (navBar.style.width !== "0" && navBar.style.width !== "") {
    openNav();
  }
});

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

window.addEventListener('load', function() {
  setTimeout(function() {
    document.body.classList.add('loaded');
    setTimeout(function() {
      document.querySelector('.aristo-preloader').style.display = 'none';
    }, 500);
  }, 1500);
});


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

 var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        let featuredPlayer;
        window.onYouTubeIframeAPIReady = function() {
            featuredPlayer = new YT.Player('featuredPlayer', {
                height: '100%',
                width: '100%',
                videoId: 'ntqivT3Nklg',
                playerVars: {
                    'playsinline': 1
                },
                events: {
                    'onReady': onPlayerReady
                }
            });
        }

        function onPlayerReady(event) {
            document.getElementById('featuredThumbnail').addEventListener('click', function() {
                this.style.display = 'none';
                event.target.playVideo();
            });
        }

        // Lightbox functionality
        document.addEventListener('DOMContentLoaded', function() {
            const filmItems = document.querySelectorAll('.masonry-item');
            const lightbox = document.getElementById('filmLightbox');
            const closeBtn = document.querySelector('.close-btn');
            const lightboxPlayer = document.getElementById('lightboxPlayer');
            const lightboxTitle = document.getElementById('lightboxTitle');
            const lightboxDesc = document.getElementById('lightboxDesc');
            
            filmItems.forEach(item => {
                item.addEventListener('click', function() {
                    const videoId = this.getAttribute('data-id');
                    const title = this.getAttribute('data-title');
                    const desc = this.getAttribute('data-desc');
                    
                    lightboxPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                    lightboxTitle.textContent = title;
                    lightboxDesc.textContent = desc;
                    
                    lightbox.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                });
            });
            
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) closeLightbox();
            });
            
            function closeLightbox() {
                lightbox.style.display = 'none';
                lightboxPlayer.src = '';
                document.body.style.overflow = 'auto';
            }
        });
 



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
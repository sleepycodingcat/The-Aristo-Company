let sidebarOpen = false
let isMobile = false

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  // Load sidebar first
  await loadSidebar()

  // Add global event listeners
  document.addEventListener("click", handleOutsideClick)
  document.addEventListener("keydown", handleEscapeKey)
  document.addEventListener("touchstart", handleTouchStart)

  // Load the footer
  fetch("footer.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load footer: ${response.statusText}`)
      }
      return response.text()
    })
    .then((data) => {
      const footerPlaceholder = document.getElementById("footer-placeholder")
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = data
      }
    })
    .catch((error) => {
      console.error("Error loading footer:", error)
      const footerPlaceholder = document.getElementById("footer-placeholder")
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
          <footer>
            <p>Error loading footer content.</p>
          </footer>
        `
      }
    })

  // Load the sidebar (already handled by loadSidebar function)
  // The fetch for sidebar.html here is redundant if loadSidebar is called.
  // Keeping it for now as it was in your original script, but it's effectively
  // handled by the initial `await loadSidebar()` call.
  fetch("sidebar.html")
    .then((response) => response.text())
    .then((data) => {
      const sidebarPlaceholder = document.getElementById("sidebar-placeholder")
      if (sidebarPlaceholder) {
        sidebarPlaceholder.innerHTML = data
      }
    })
    .catch((error) => {
      console.error("Error loading sidebar (redundant fetch):", error)
    })

  const logoContainer = document.querySelector("#logoContainer")
  const video = document.querySelector("#videoLogo")

  // Ensure logo video elements exist before adding listeners
  if (logoContainer && video) {
    function playVideo() {
      if (window.getComputedStyle(video).display !== "none") {
        video.play()
      }
    }

    function pauseVideo() {
      if (window.getComputedStyle(video).display !== "none") {
        video.pause()
        video.currentTime = 0
      }
    }

    logoContainer.addEventListener("mouseenter", playVideo)
    logoContainer.addEventListener("mouseleave", pauseVideo)
  }

  // Initialize lazy loading for media
  initializeLazyLoading()
})

// Preloader functionality: Disappear after a fixed delay after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Minimum show time (e.g., 500ms) before fading out
  setTimeout(() => {
    document.body.classList.add("loaded")
    // Remove after fade completes (500ms transition in CSS)
    setTimeout(() => {
      const preloader = document.querySelector(".aristo-preloader")
      if (preloader) {
        preloader.remove()
      }
    }, 500)
  }, 500) // Preloader visible for at least 500ms after DOMContentLoaded
})

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
    if (!response.ok) {
      throw new Error(`Failed to load sidebar: ${response.statusText}`)
    }
    const sidebarHTML = await response.text()

    // Insert sidebar into placeholder
    const placeholder = document.getElementById("sidebar-placeholder")
    if (placeholder) {
      placeholder.innerHTML = sidebarHTML
      initializeSidebar() // Initialize sidebar after it's loaded
    } else {
      console.error("Sidebar placeholder not found.")
    }
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

// Lazy loading for iframes and embeds
function initializeLazyLoading() {
  const lazyMediaElements = document.querySelectorAll(".lazy-load-media")

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const mediaElement = entry.target
            if (mediaElement.tagName === "IFRAME") {
              mediaElement.src = mediaElement.dataset.src
            } else if (mediaElement.tagName === "EMBED") {
              mediaElement.src = mediaElement.dataset.src // For embed, use 'src' attribute (HTML5 preferred)
            }
            observer.unobserve(mediaElement)
          }
        })
      },
      {
        rootMargin: "0px 0px 100px 0px", // Load when 100px from viewport
        threshold: 0.01, // Trigger when even a tiny part is visible
      },
    )

    lazyMediaElements.forEach((mediaElement) => {
      observer.observe(mediaElement)
    })
  } else {
    // Fallback for browsers that don't support Intersection Observer
    lazyMediaElements.forEach((mediaElement) => {
      if (mediaElement.tagName === "IFRAME") {
        mediaElement.src = mediaElement.dataset.src
      } else if (mediaElement.tagName === "EMBED") {
        mediaElement.src = mediaElement.dataset.src
      }
    })
  }
}

// Make openNav and closeNav globally accessible for HTML onclick attributes
window.openNav = openNav
window.closeNav = closeNav

let sidebarOpen = false
let isMobile = false

async function fetchComponentHtml(fileName) {
  const pathSegments = window.location.pathname.split("/").filter(Boolean)
  const siteBase = pathSegments.length > 0 ? `/${pathSegments[0]}` : ""
  const candidatePaths = [
    siteBase ? `${siteBase}/components/${fileName}` : "",
    `components/${fileName}`,
    `../components/${fileName}`,
  ].filter(Boolean)

  for (const candidatePath of [...new Set(candidatePaths)]) {
    try {
      const response = await fetch(candidatePath)
      if (response.ok) {
        return response.text()
      }
    } catch {
      continue
    }
  }

  throw new Error(`Failed to load component: ${fileName}`)
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Load sidebar without blocking other startup work
  loadSidebar()

  // Apply media loading optimizations as early as possible
  optimizePageMediaLoading()

  // Add global event listeners
  document.addEventListener("click", handleOutsideClick)
  document.addEventListener("keydown", handleEscapeKey)
  document.addEventListener("touchstart", handleTouchStart)

  // Load the footer
  fetchComponentHtml("footer.html")
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

  const logoContainer = document.querySelector("#logoContainer")
  const video = document.querySelector("#videoLogo")

  // Ensure logo video elements exist before adding listeners
  if (logoContainer && video) {
    function playVideo() {
      if (window.getComputedStyle(video).display !== "none") {
        if (video.preload === "none" && video.readyState === 0) {
          video.load()
        }
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
  // Keep preloader brief so first paint feels faster
  setTimeout(() => {
    document.body.classList.add("loaded")
    // Remove after fade completes (500ms transition in CSS)
    setTimeout(() => {
      const preloader = document.querySelector(".aristo-preloader")
      if (preloader) {
        preloader.remove()
      }
    }, 500)
  }, 150)
})

function optimizePageMediaLoading() {
  const staticLogo = document.getElementById("staticLogo")
  if (staticLogo) {
    staticLogo.decoding = "async"
    staticLogo.setAttribute("fetchpriority", "high")
  }

  const logoVideo = document.getElementById("videoLogo")
  if (logoVideo) {
    logoVideo.preload = "none"
  }

  const galleryImages = document.querySelectorAll(".picture")
  galleryImages.forEach((img, index) => {
    img.decoding = "async"
    if (index > 7) {
      img.setAttribute("fetchpriority", "low")
    }
  })

  const decorativeImages = document.querySelectorAll(".hoverStickPpl")
  decorativeImages.forEach((img) => {
    img.loading = "lazy"
    img.decoding = "async"
    img.setAttribute("fetchpriority", "low")
  })
}

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
    const sidebarHTML = await fetchComponentHtml("sidebar.html")

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

  const accordionToggles = sidebar.querySelectorAll(".sidebar-accordion-toggle")

  const collapseAccordion = (toggleButton) => {
    const submenuId = toggleButton.getAttribute("aria-controls")
    const submenu = submenuId ? sidebar.querySelector(`#${submenuId}`) : null
    if (!submenu) return

    toggleButton.setAttribute("aria-expanded", "false")
    toggleButton.classList.remove("is-open")
    submenu.hidden = true
  }

  accordionToggles.forEach((toggleButton) => {
    const submenuId = toggleButton.getAttribute("aria-controls")
    const submenu = submenuId ? sidebar.querySelector(`#${submenuId}`) : null
    if (!submenu) return

    toggleButton.addEventListener("click", () => {
      const willExpand = toggleButton.getAttribute("aria-expanded") !== "true"

      accordionToggles.forEach((btn) => {
        collapseAccordion(btn)
      })

      if (willExpand) {
        toggleButton.setAttribute("aria-expanded", "true")
        toggleButton.classList.add("is-open")
        submenu.hidden = false
      }
    })
  })
}

// Open sidebar function
function openNav() {
  const sidebar = document.getElementById("navBar")
  const html = document.documentElement

  if (!sidebar) {
    console.error("Sidebar not found")
    return
  }

  sidebarOpen = true

  if (isMobile) {
    sidebar.style.width = "100%"
    // Prevent body scroll on mobile by hiding overflow on html element
    html.style.overflow = "hidden"
  } else {
    sidebar.style.width = "40vw"
  }

  sidebar.classList.add("open")
  sidebar.style.transform = "translateX(0)"
}

// Close sidebar function
function closeNav() {
  const sidebar = document.getElementById("navBar")
  const html = document.documentElement

  if (!sidebar) {
    console.error("Sidebar not found")
    return
  }

  sidebarOpen = false
  sidebar.style.width = "0"
  sidebar.classList.remove("open")
  sidebar.style.transform = "translateX(100%)"

  const accordionToggles = sidebar.querySelectorAll(".sidebar-accordion-toggle")
  accordionToggles.forEach((toggleButton) => {
    const submenuId = toggleButton.getAttribute("aria-controls")
    const submenu = submenuId ? sidebar.querySelector(`#${submenuId}`) : null
    if (!submenu) return

    toggleButton.setAttribute("aria-expanded", "false")
    toggleButton.classList.remove("is-open")
    submenu.hidden = true
  })

  // Restore body scroll on mobile
  if (isMobile) {
    html.style.overflow = ""
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


// ALL FILMS PAGE LIGHTBOX

var tag = document.createElement("script")
tag.src = "https://www.youtube.com/iframe_api"
var firstScriptTag = document.getElementsByTagName("script")[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

let featuredPlayer
window.onYouTubeIframeAPIReady = () => {
  // The commercial page uses the lightbox but has no featured film
  if (!document.getElementById("featuredPlayer")) return
  featuredPlayer = new YT.Player("featuredPlayer", {
    height: "100%",
    width: "100%",
    videoId: "ntqivT3Nklg",
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: onPlayerReady,
    },
  })
}

function onPlayerReady(event) {
  document.getElementById("featuredThumbnail").addEventListener("click", function () {
    this.style.display = "none"
    event.target.playVideo()
  })
}

// Lightbox functionality
document.addEventListener("DOMContentLoaded", () => {
  const filmItems = document.querySelectorAll(".masonry-item")
  const lightbox = document.getElementById("filmLightbox")
  const closeBtn = document.querySelector(".close-btn")
  const lightboxPlayer = document.getElementById("lightboxPlayer")
  const lightboxTitle = document.getElementById("lightboxTitle")
  const lightboxMeta = document.getElementById("lightboxMeta")
  const lightboxDesc = document.getElementById("lightboxDesc")

  filmItems.forEach((item) => {
    item.addEventListener("click", function () {
      const videoId = this.getAttribute("data-id")
      const instagramId = this.getAttribute("data-instagram") // Commercial page reels
      const title = this.getAttribute("data-title")
      const desc = this.getAttribute("data-desc")
      const btsLink = this.getAttribute("data-bts-link") // Get the BTS link
      const runtime = this.getAttribute("data-runtime")
      const year = this.getAttribute("data-year")
      const role = this.getAttribute("data-role")

      // Instagram reels are vertical, so the lightbox switches to a narrower layout
      const igBtn = document.getElementById("igBtn")
      if (instagramId) {
        lightboxPlayer.src = `https://www.instagram.com/p/${instagramId}/embed/`
        lightbox.classList.add("is-vertical")
      } else {
        lightboxPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
        lightbox.classList.remove("is-vertical")
      }
      if (igBtn) {
        igBtn.href = `https://www.instagram.com/p/${instagramId}/`
        igBtn.style.display = instagramId ? "inline-block" : "none"
      }
      lightboxTitle.textContent = title
      lightboxDesc.innerHTML = desc.replace('|', '<br><br>')
      // Build metadata line
      if (year || runtime || role) {
        const metaParts = []
        if (year) metaParts.push(year)
        if (runtime) metaParts.push(runtime)
        if (role) metaParts.push(role)
        lightboxMeta.textContent = metaParts.join(" • ")
        lightboxMeta.style.display = "block"
      } else {
        lightboxMeta.style.display = "none"
      }

      // Set the BTS button href
      const btsBtn = document.getElementById("btsBtn")
      if (btsBtn && btsLink) {
        btsBtn.href = btsLink
        btsBtn.style.display = "inline-block" // Ensure button is visible if a link exists
      } else if (btsBtn) {
        btsBtn.style.display = "none" // Hide button if no BTS link is provided
      }

      lightbox.style.display = "flex"
      document.body.style.overflow = "hidden"
    })
  })

  closeBtn.addEventListener("click", closeLightbox)
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox()
  })

  function closeLightbox() {
    lightbox.style.display = "none"
    lightboxPlayer.src = ""
    document.body.style.overflow = "auto"
  }

  // Commercial page: filter the social reels by category
  const socialFilters = document.querySelectorAll(".social-filters .filter-btn")
  socialFilters.forEach((btn) => {
    btn.addEventListener("click", () => {
      socialFilters.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      const filter = btn.getAttribute("data-filter")
      document.querySelectorAll(".social-tile").forEach((tile) => {
        const show = filter === "all" || tile.getAttribute("data-category") === filter
        tile.style.display = show ? "" : "none"
      })
    })
  })

  // Commercial page: repeat the client logos until one set fills the strip, then double it
  // so that scrolling the track by half loops without a jump
  const logoTrack = document.querySelector(".logo-track")
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (logoTrack && logoTrack.children.length && !reduceMotion) {
    const originals = [...logoTrack.children]
    const addCopy = () => {
      originals.forEach((li) => {
        const copy = li.cloneNode(true)
        copy.setAttribute("aria-hidden", "true") // screen readers hear each client once
        logoTrack.appendChild(copy)
      })
    }
    logoTrack.classList.add("is-scrolling")
    while (logoTrack.offsetWidth < logoTrack.parentElement.clientWidth) addCopy()
    const copiesPerSet = logoTrack.children.length / originals.length
    for (let i = 0; i < copiesPerSet; i++) addCopy()
    // steady speed (about 50px a second) however long the strip is
    logoTrack.style.setProperty("--marquee-duration", `${logoTrack.offsetWidth / 2 / 50}s`)
  }
})

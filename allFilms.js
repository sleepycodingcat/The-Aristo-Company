
// ALL FILMS PAGE LIGHTBOX

var tag = document.createElement("script")
tag.src = "https://www.youtube.com/iframe_api"
var firstScriptTag = document.getElementsByTagName("script")[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

let featuredPlayer
window.onYouTubeIframeAPIReady = () => {
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
      const title = this.getAttribute("data-title")
      const desc = this.getAttribute("data-desc")
      const btsLink = this.getAttribute("data-bts-link") // Get the BTS link
      const runtime = this.getAttribute("data-runtime")
      const year = this.getAttribute("data-year")
      const role = this.getAttribute("data-role")

      lightboxPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
      lightboxTitle.textContent = title
      lightboxDesc.textContent = desc

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
})

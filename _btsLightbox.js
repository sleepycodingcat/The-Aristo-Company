// PHOTO LIGHTBOX FUNCTIONALITY
document.addEventListener("DOMContentLoaded", () => {
  // Get all image and video containers in the BTS gallery
  const allMediaContainers = document.querySelectorAll(".orange-juice-bts .imgRow .imgContainer")
  const stickFigures = document.querySelectorAll(".hoverStickPpl") // Assuming these still exist and are relevant

  // Track current visible media elements and current slide index
  // We'll store the actual img/video elements here for easy access
  const visibleMediaElements = Array.from(allMediaContainers).map((container) => container.querySelector(".picture"))
  let currentIndex = 0

  // LIGHTBOX FUNCTIONALITY
  const modal = document.getElementById("myModal")
  const closeBtn = document.querySelector(".close")
  const lightboxMediaContainer = modal.querySelector(".lightbox-media-container")
  const modalTitle = modal.querySelector(".imgInfo h2")
  const slideCounter = modal.querySelector(".numbertext")
  const mySlidesDiv = modal.querySelector(".mySlides") // Get the mySlides div

  // Function to pause any currently playing video in the lightbox
  function pauseCurrentVideo() {
    const currentVideo = lightboxMediaContainer.querySelector("video")
    if (currentVideo) {
      currentVideo.pause()
    }
  }

  // When the user clicks on <span> (x), close the modal
  closeBtn.onclick = () => {
    window.closeModal()
  }

  // When the user clicks anywhere outside of the modal content, close it
  window.onclick = (event) => {
    if (event.target == modal) {
      window.closeModal()
    }
  }

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "flex") {
      // Check for 'flex' as per new CSS
      if (e.key === "ArrowLeft") {
        window.plusSlides(-1)
      } else if (e.key === "ArrowRight") {
        window.plusSlides(1)
      } else if (e.key === "Escape") {
        window.closeModal()
      }
    }
  })

  // Function to show specific slide (image or video)
  window.showSlide = (index) => {
    pauseCurrentVideo() // Pause any existing video before changing slide

    // Ensure index is within bounds
    if (index < 0) {
      currentIndex = visibleMediaElements.length - 1
    } else if (index >= visibleMediaElements.length) {
      currentIndex = 0
    } else {
      currentIndex = index
    }

    const currentMediaElement = visibleMediaElements[currentIndex]

    // --- IMPORTANT: Add a robust check here for the media element and its source ---
    if (!currentMediaElement || !currentMediaElement.src) {
      console.error("No valid media element or source found for slide index:", currentIndex, currentMediaElement)
      lightboxMediaContainer.innerHTML = "" // Ensure it's blank if no media
      if (modalTitle) modalTitle.textContent = "Error: Media not found"
      if (slideCounter) slideCounter.textContent = ""
      // Still open the modal, but it will be blank with an error message
      modal.style.display = "flex"
      if (mySlidesDiv) mySlidesDiv.style.display = "flex"
      document.body.style.overflow = "hidden"
      return // Exit the function early
    }
    // --- End of important check ---

    const title = currentMediaElement.getAttribute("data-title") || ""
    const mediaSrc = currentMediaElement.src
    const mediaType = currentMediaElement.dataset.type // 'image' or 'video'

    // Clear previous content
    lightboxMediaContainer.innerHTML = ""

    let mediaElement

    if (mediaType === "image") {
      mediaElement = document.createElement("img")
      mediaElement.className = "modal-media" // Add a class for styling if needed
      mediaElement.src = mediaSrc
      mediaElement.alt = currentMediaElement.alt || title
    } else if (mediaType === "video") {
      mediaElement = document.createElement("video")
      mediaElement.className = "modal-media" // Add a class for styling if needed
      mediaElement.src = mediaSrc
      mediaElement.controls = true // Show video controls
      mediaElement.autoplay = true // Autoplay the video
      mediaElement.loop = false // Do not loop by default in lightbox
      mediaElement.muted = false // Allow sound in lightbox
      mediaElement.setAttribute("playsinline", "") // For iOS autoplay
    }

    if (mediaElement) {
      lightboxMediaContainer.appendChild(mediaElement)
    }

    if (modalTitle) modalTitle.textContent = title
    if (slideCounter) slideCounter.textContent = `${currentIndex + 1} / ${visibleMediaElements.length}`

    // Display the modal and the mySlides div
    modal.style.display = "flex" // Use flex as per new CSS
    if (mySlidesDiv) mySlidesDiv.style.display = "flex" // Explicitly show mySlides as flex
    document.body.style.overflow = "hidden" // Prevent scrolling background
  }

  // Function to open modal with media
  function openModal(mediaElement) {
    // Find the index of the clicked media element in the visibleMediaElements array
    currentIndex = visibleMediaElements.indexOf(mediaElement)
    if (currentIndex === -1) currentIndex = 0 // Fallback if not found

    window.showSlide(currentIndex)
  }

  // Add click event to each media container to open modal
  allMediaContainers.forEach((container) => {
    container.addEventListener("click", function () {
      const mediaElement = this.querySelector(".picture") // Get the actual img or video inside the clicked container
      if (mediaElement) {
        // --- IMPORTANT: Only call openModal if a .picture element is found ---
        openModal(mediaElement)
      } else {
        console.error("Clicked container does not contain a .picture element:", this)
      }
    })
  })

  // Add click event to each stick figure to open the modal for its parent media
  stickFigures.forEach((stick) => {
    stick.addEventListener("click", function () {
      const container = this.closest(".imgContainer")
      if (container) {
        // --- IMPORTANT: Check if container exists ---
        const media = container.querySelector(".picture")
        if (media) {
          // --- IMPORTANT: Only call openModal if a .picture element is found ---
          openModal(media)
        } else {
          console.error("Stick figure's parent container does not contain a .picture element:", container)
        }
      } else {
        console.error("Stick figure has no .imgContainer parent:", this)
      }
    })
  })

  // Add touch swipe support for mobile
  let touchStartX = 0
  let touchEndX = 0

  modal.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX
    },
    false,
  )

  modal.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    },
    false,
  )

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swipe left, go to next slide
      window.plusSlides(1)
    }
    if (touchEndX > touchStartX + 50) {
      // Swipe right, go to previous slide
      window.plusSlides(-1)
    }
  }
})

// Global functions (made accessible in HTML via onclick)
function closeModal() {
  const modal = document.getElementById("myModal")
  const lightboxMediaContainer = modal.querySelector(".lightbox-media-container")
  const currentVideo = lightboxMediaContainer.querySelector("video")
  const mySlidesDiv = modal.querySelector(".mySlides") // Get the mySlides div

  if (currentVideo) {
    currentVideo.pause() // Pause video when closing modal
  }
  modal.style.display = "none"
  if (mySlidesDiv) mySlidesDiv.style.display = "none" // Explicitly hide mySlides
  document.body.style.overflow = "auto" // Re-enable scrolling
}

function plusSlides(n) {
  const modal = document.getElementById("myModal")
  const slideCounterText = modal.querySelector(".numbertext").textContent
  const parts = slideCounterText.split(" / ")
  const currentIdx = Number.parseInt(parts[0]) - 1 // Convert to 0-based index

  // Re-fetch all media elements from their containers to ensure it's always up-to-date
  const allMediaContainers = document.querySelectorAll(".orange-juice-bts .imgRow .imgContainer")
  const visibleMediaElements = Array.from(allMediaContainers).map((container) => container.querySelector(".picture"))

  let newIndex = currentIdx + n
  if (newIndex < 0) {
    newIndex = visibleMediaElements.length - 1
  } else if (newIndex >= visibleMediaElements.length) {
    newIndex = 0
  }

  // Call the main showSlide function to handle media display
  window.showSlide(newIndex) // Re-call showSlide with the new index

  return false // Prevent default
}

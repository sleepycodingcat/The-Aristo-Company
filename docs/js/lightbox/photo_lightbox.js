// PHOTO FILTERING AND LIGHTBOX FUNCTIONALITY
document.addEventListener("DOMContentLoaded", () => {
  // Get all filter buttons and images
  const filterButtons = document.querySelectorAll(".filter-btn")
  const allImages = document.querySelectorAll(".picture")
  const stickFigures = document.querySelectorAll(".hoverStickPpl")

  // Track current visible images and current slide index
  let visibleImages = Array.from(allImages)
  let currentIndex = 0

  // Add data-index to all images initially
  function updateImageIndices() {
    visibleImages.forEach((img, index) => {
      img.setAttribute('data-index', index)
    })
  }
  updateImageIndices()

  // LIGHTBOX FUNCTIONALITY
  // Get the modal
  const modal = document.getElementById("myModal")

  // Get the <span> element that closes the modal
  const closeBtn = document.querySelector(".close")

  // When the user clicks on <span> (x), close the modal
  closeBtn.onclick = () => {
    modal.style.display = "none"
  }

  // When the user clicks anywhere outside of the modal content, close it
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none"
    }
  }

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "block") {
      if (e.key === "ArrowLeft") {
        plusSlides(-1)
      } else if (e.key === "ArrowRight") {
        plusSlides(1)
      } else if (e.key === "Escape") {
        closeModal()
      }
    }
  })

  // Function to show specific slide
  function showSlide(index) {
    // Ensure index is within bounds
    if (index < 0) {
      currentIndex = visibleImages.length - 1
    } else if (index >= visibleImages.length) {
      currentIndex = 0
    } else {
      currentIndex = index
    }

    const img = visibleImages[currentIndex]

    // Get image data attributes
    const title = img.getAttribute("data-title") || "Untitled"
    const location = img.getAttribute("data-location") || "Unknown"
    const year = img.getAttribute("data-year") || ""

    // Create modal content with navigation buttons and counter
    const modalContent = document.querySelector(".modal-content")
    modalContent.innerHTML = `
      <div class="mySlides" style="display: block;">
        <div class="numbertext">${currentIndex + 1} / ${visibleImages.length}</div>
        <img src="${img.src}" style="width:100%">
        <div class="imgInfo">
          <h2>${title}</h2>
          <p>${location} | ${year}</p>
        </div>
      </div>
      
      <a class="prev" onclick="event.stopPropagation(); plusSlides(-1);">&#10094;</a>
      <a class="next" onclick="event.stopPropagation(); plusSlides(1);">&#10095;</a>
    `

    // Display the modal
    modal.style.display = "block"

    // Add event listeners to navigation buttons
    const prevBtn = modalContent.querySelector(".prev")
    const nextBtn = modalContent.querySelector(".next")

    prevBtn.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation()
      plusSlides(-1)
    })

    nextBtn.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation()
      plusSlides(1)
    })
  }

  // Function to open modal with image
  function openModal(img) {
    // Get index from data attribute with indexOf fallback for safety
    const imgIndex = parseInt(img.getAttribute("data-index"), 10)
    const fallbackIndex = visibleImages.indexOf(img)
    currentIndex =
      !Number.isNaN(imgIndex) && imgIndex >= 0 && imgIndex < visibleImages.length
        ? imgIndex
        : fallbackIndex >= 0
          ? fallbackIndex
          : 0

    showSlide(currentIndex)
  }

  // Function to navigate to previous/next slide
  window.plusSlides = (n) => {
    showSlide(currentIndex + n)
    return false // Prevent default
  }

  let lastTouchOpenAt = 0

  function addImageOpenHandlers(imageElement) {
    let touchStartX = 0
    let touchStartY = 0
    let isScrolling = false

    imageElement.addEventListener("click", function () {
      if (Date.now() - lastTouchOpenAt < 400) return
      openModal(this)
    })

    imageElement.addEventListener(
      "touchstart",
      function (e) {
        const touch = e.changedTouches[0]
        touchStartX = touch.screenX
        touchStartY = touch.screenY
        isScrolling = false
      },
      { passive: true },
    )

    imageElement.addEventListener(
      "touchmove",
      function (e) {
        const touch = e.changedTouches[0]
        if (
          Math.abs(touch.screenX - touchStartX) > 10 ||
          Math.abs(touch.screenY - touchStartY) > 10
        ) {
          isScrolling = true
        }
      },
      { passive: true },
    )

    imageElement.addEventListener("touchend", function (e) {
      if (isScrolling) return
      lastTouchOpenAt = Date.now()
      if (e.cancelable) e.preventDefault()
      openModal(this)
    })
  }

  // Add click and touch events to each image to open modal
  allImages.forEach((img) => {
    addImageOpenHandlers(img)
  })

  // Add click event to each stick figure to open the modal for its parent image
  stickFigures.forEach((stick) => {
    stick.addEventListener("click", function () {
      // Find the parent container
      const container = this.closest(".imgContainer")
      // Find the image within the container
      const img = container.querySelector(".picture")
      // Open modal with this image
      openModal(img)
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
      plusSlides(1)
    }
    if (touchEndX > touchStartX + 50) {
      // Swipe right, go to previous slide
      plusSlides(-1)
    }
  }

  // FILTERING FUNCTIONALITY
  // Add click and touch event to each filter button
  filterButtons.forEach((button) => {
    const handleFilter = function(e) {
      // Prevent default and stop propagation to avoid double triggers on mobile
      e.preventDefault()
      e.stopPropagation()
      
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Get filter value
      const filterValue = this.getAttribute("data-filter")

      // Reset visible images array
      visibleImages = []

      // Determine which images should be visible
      allImages.forEach((img) => {
        let isVisible = true

        if (filterValue !== "all") {
          if (filterValue === "favorite") {
            isVisible = img.getAttribute("data-favorite") === "true"
          } else {
            isVisible = img.getAttribute("data-type") === filterValue
          }
        }

        // Store visible images
        if (isVisible) {
          visibleImages.push(img)
        }
      })

      // Get all columns
      const columns = document.querySelectorAll(".imgColumn")

      // If no visible images, return
      if (visibleImages.length === 0) return

      // Determine number of columns based on screen width
      const numColumns = window.innerWidth <= 800 ? 2 : 4

      // Create new columns
      const newColumns = []
      for (let i = 0; i < numColumns; i++) {
        const newColumn = document.createElement("div")
        newColumn.className = "imgColumn"
        newColumns.push(newColumn)
      }

      // Sort images by height (tallest first) to improve distribution
      const sortedImages = [...visibleImages].sort((a, b) => {
        const aRatio = a.naturalHeight / a.naturalWidth || 1
        const bRatio = b.naturalHeight / b.naturalWidth || 1
        return bRatio - aRatio // Sort by aspect ratio (tallest first)
      })

      // Create a balanced distribution of images
      distributeImages(sortedImages, newColumns)

      // Clear the row and add new columns
      const imgRow = document.querySelector(".imgRow")
      imgRow.innerHTML = ""
      newColumns.forEach((col) => {
        imgRow.appendChild(col)
      })

      // Update visibleImages array in visual reading order
      visibleImages = getImagesInVisualOrder()
      
      // Update data-index attributes for new visible images
      updateImageIndices()
    }
    
    // Add both click and touchend events
    button.addEventListener("click", handleFilter)
    button.addEventListener("touchend", function(e) {
      // Check if this was a tap (not a scroll)
      if (Math.abs(touchStartX - e.changedTouches[0].screenX) < 10) {
        handleFilter.call(this, e)
      }
    })
    
    // Track touch start for swipe detection
    let touchStartX = 0
    button.addEventListener("touchstart", function(e) {
      touchStartX = e.changedTouches[0].screenX
    })
  })

  // Function to get images in visual reading order (left-to-right, top-to-bottom)
  function getImagesInVisualOrder() {
    const columns = Array.from(document.querySelectorAll(".imgColumn"))
    if (columns.length === 0) return []

    // Get all images from each column
    const columnImages = columns.map(col => 
      Array.from(col.querySelectorAll(".picture"))
    )

    // Find the maximum number of images in any column
    const maxImagesPerColumn = Math.max(...columnImages.map(col => col.length))

    // Interleave images from columns to create visual reading order
    const visualOrder = []
    for (let row = 0; row < maxImagesPerColumn; row++) {
      for (let col = 0; col < columnImages.length; col++) {
        if (columnImages[col][row]) {
          visualOrder.push(columnImages[col][row])
        }
      }
    }

    return visualOrder
  }

  // Function to distribute images across columns using a better algorithm
  function distributeImages(images, columns) {
    // Create an array to track the height of each column
    const columnHeights = new Array(columns.length).fill(0)

    // Process each image
    images.forEach((img) => {
      // Calculate aspect ratio to better estimate displayed height
      const aspectRatio = img.naturalHeight / img.naturalWidth || 1

      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
      const container = img.closest(".imgContainer")

      // Clone the container to avoid reference issues
      const clonedContainer = container.cloneNode(true)

      // Add click event to the cloned image
      const clonedImg = clonedContainer.querySelector(".picture")
      addImageOpenHandlers(clonedImg)

      // Add click event to any stick figures in the cloned container
      const clonedStick = clonedContainer.querySelector(".hoverStickPpl")
      if (clonedStick) {
        clonedStick.addEventListener("click", function () {
          // Find the image within the container
          const img = this.closest(".imgContainer").querySelector(".picture")
          // Open modal with this image
          openModal(img)
        })
      }

      // Add the cloned container to the shortest column
      columns[shortestColumnIndex].appendChild(clonedContainer)

      // Estimate the displayed height based on column width and aspect ratio
      // We add a constant for container margins/padding
      const columnWidth = 100 / columns.length // percentage width
      const estimatedHeight = columnWidth * aspectRatio + 20 // 20px for margins/padding

      // Update the height of the column
      columnHeights[shortestColumnIndex] += estimatedHeight
    })
  }

  // Set "Show All" as default active filter
  const showAllButton = document.querySelector('.filter-btn[data-filter="all"]')
  if (showAllButton) {
    showAllButton.classList.add("active")
  }

  // Keep original DOM on first paint (faster first load)
  visibleImages = getImagesInVisualOrder()
  updateImageIndices()
})

// Function to close modal (referenced in HTML)
function closeModal() {
  document.getElementById("myModal").style.display = "none"
}

// Function to navigate slides (referenced in HTML)
function plusSlides(n) {
  window.plusSlides(n)
  return false // Prevent default
}

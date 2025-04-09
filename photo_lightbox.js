// DYNAMIC IMAGE LIGHTBOX
document.addEventListener("DOMContentLoaded", () => {
    // Check if we're on the photography page
    const isMediaPhotography = window.location.pathname.includes("mediaPhotography") || 
                              document.getElementById("myModal") !== null;
    
    if (isMediaPhotography) {
      setupDynamicLightbox();
    }
  
    function setupDynamicLightbox() {
      const modal = document.getElementById("myModal");
      if (!modal) return;
  
      // Rest of your code remains the same...
      // Clear any existing content in the modal
      const modalContent = modal.querySelector(".modal-content");
      if (!modalContent) return;
  
      // Keep only the navigation controls if they exist
      const prevButton = modalContent.querySelector(".prev");
      const nextButton = modalContent.querySelector(".next");
  
      // Clear the modal content
      modalContent.innerHTML = "";
  
      // Add back the navigation controls if they existed
      if (prevButton) modalContent.appendChild(prevButton);
      if (nextButton) modalContent.appendChild(nextButton);
  
      // Get all gallery images
      const galleryImages = document.querySelectorAll(".picture");
      const totalImages = galleryImages.length;
  
      // Create slides for each gallery image
      galleryImages.forEach((img, index) => {
        // Get image info
        const imgSrc = img.getAttribute("src");
        const imgContainer = img.closest(".imgContainer");
  
        // Try to extract title from filename or use a default
        let imgTitle = imgSrc.split("/").pop(); // Get filename
        imgTitle = imgTitle.split(".")[0]; // Remove extension
        imgTitle = imgTitle.replace(/([A-Z])/g, " $1").trim(); // Add spaces before capital letters
  
        // Create slide
        const slide = document.createElement("div");
        slide.className = "mySlides";
  
        // Create slide content
        slide.innerHTML = `
          <div class="numbertext">${index + 1} / ${totalImages}</div>
          <img src="${imgSrc}" style="width:100%">
          <p class="imgInfo">${imgTitle.toUpperCase()} | CHOI HONG | 2022</p>
        `;
  
        // Add slide to modal
        modalContent.appendChild(slide);
  
        // Update the onclick handler for the gallery image
        img.onclick = () => {
          openModalFunc();
          currentSlideFunc(index + 1);
        };
  
        // If there's a stick figure in the container, update its onclick too
        const stickFigure = imgContainer?.querySelector(".hoverStickPpl");
        if (stickFigure) {
          stickFigure.onclick = () => {
            openModalFunc();
            currentSlideFunc(index + 1);
          };
        }
      });
  
      // Add navigation controls if they don't exist
      if (!prevButton) {
        const prev = document.createElement("a");
        prev.className = "prev";
        prev.innerHTML = " &#129152;";
        prev.onclick = () => {
          plusSlidesFunc(-1);
        };
        modalContent.appendChild(prev);
      }
  
      if (!nextButton) {
        const next = document.createElement("a");
        next.className = "next";
        next.innerHTML = " &#129154;";
        next.onclick = () => {
          plusSlidesFunc(1);
        };
        modalContent.appendChild(next);
      }
  
      // Set up lightbox functionality
      var slideIndex = 1;
  
      // Open the Modal
      function openModalFunc() {
        modal.style.display = "block";
      }
      window.openModal = openModalFunc;
  
      // Close the Modal
      function closeModalFunc() {
        modal.style.display = "none";
      }
      window.closeModal = closeModalFunc;
  
      // Next/previous controls
      function plusSlidesFunc(n) {
        showSlides((slideIndex += n));
      }
      window.plusSlides = plusSlidesFunc;
  
      // Thumbnail image controls
      function currentSlideFunc(n) {
        showSlides((slideIndex = n));
      }
      window.currentSlide = currentSlideFunc;
  
      function showSlides(n) {
        var slides = document.getElementsByClassName("mySlides");
  
        if (!slides || slides.length === 0) return;
  
        if (n > slides.length) {
          slideIndex = 1;
        }
        if (n < 1) {
          slideIndex = slides.length;
        }
  
        // Hide all slides
        for (var i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }
  
        // Show the current slide
        slides[slideIndex - 1].style.display = "block";
  
        // Update the slide number text
        const numbertext = slides[slideIndex - 1].querySelector(".numbertext");
        if (numbertext) {
          numbertext.textContent = slideIndex + " / " + slides.length;
        }
      }
  
      // Initialize by showing the first slide
      showSlides(slideIndex);
  
      // Add close button to modal if it doesn't exist
      if (!modal.querySelector(".close")) {
        const closeBtn = document.createElement("span");
        closeBtn.className = "close cursor";
        closeBtn.innerHTML = "&times;";
        closeBtn.onclick = closeModalFunc;
        modal.insertBefore(closeBtn, modalContent);
      }
    }
  });
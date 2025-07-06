
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

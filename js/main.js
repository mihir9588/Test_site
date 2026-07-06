/**
 * Tantronics - Multi-Page Core Script Logic with Web3Forms AJAX Handling & Redirects
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Footer Year Configuration
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Web3Forms Asynchronous AJAX Processing Engine
  const formsConfig = [
    { formId: 'contactForm', statusId: 'formStatus' },
    { formId: 'homeEnquiryForm', statusId: 'homeFormStatus' }
  ];

  formsConfig.forEach(({ formId, statusId }) => {
    const formNode = document.getElementById(formId);
    const statusNode = document.getElementById(statusId);

    formNode?.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevents page reload
      if (!statusNode) return;

      // Front-end Native Field Check
      if (!this.checkValidity()) {
        statusNode.className = "mt-3 text-center text-danger small fw-bold";
        statusNode.textContent = "Please fill in all fields correctly.";
        return;
      }

      statusNode.className = "mt-3 text-center text-warning small fw-bold";
      statusNode.textContent = "Processing technical parameters transmission...";

      const formData = new FormData(this);

      // Async Request Delivery to Web3Forms Gateway
      fetch(this.action, {
        method: this.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(async (response) => {
        if (response.status === 200) {
          statusNode.className = "mt-3 text-center text-success small fw-bold";
          statusNode.textContent = "Success! Forwarding to confirmation page...";
          
          // FORCED MANUAL REDIRECT FIX:
          // This safely extracts the exact destination value you put in your HTML hidden input
          const redirectTarget = formNode.querySelector('input[name="redirect"]')?.value;
          
          if (redirectTarget) {
            // Instantly route the tab to your thankyou.html page
            window.location.href = redirectTarget; 
          } else {
            // Fallback layout clean if redirect value is missing
            formNode.reset();
          }
        } else {
          const json = await response.json();
          statusNode.className = "mt-3 text-center text-danger small fw-bold";
          statusNode.textContent = json.message || "Transmission network anomaly encountered.";
        }
      })
      .catch(() => {
        statusNode.className = "mt-3 text-center text-danger small fw-bold";
        statusNode.textContent = "Error establishing gateway link.";
      });
    });
  });

  // 3. Product Catalog Category Filtering (Only triggers on product catalog pages)
  const productGrid = document.getElementById("productGrid");
  if (productGrid) {
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;
        document.querySelectorAll(".product-item").forEach(item => {
          if (filter === "all" || item.dataset.category === filter) {
            item.style.display = "block";
            item.classList.add("fade-in");
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }
});
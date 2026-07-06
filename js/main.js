/**
 * Tantronics - Multi-Page Core Script Logic with Web3Forms AJAX Handling &
 * Cross-Page Category Filter Mapping.
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
      e.preventDefault(); // Prevents manual form bounce reload
      if (!statusNode) return;

      if (!this.checkValidity()) {
        statusNode.className = "mt-3 text-center text-danger small fw-bold";
        statusNode.textContent = "Please fill in all fields correctly.";
        return;
      }

      statusNode.className = "mt-3 text-center text-warning small fw-bold";
      statusNode.textContent = "Processing technical parameters transmission...";

      const formData = new FormData(this);

      fetch(this.action, {
        method: this.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(async (response) => {
        if (response.status === 200) {
          statusNode.className = "mt-3 text-center text-success small fw-bold";
          statusNode.textContent = "Success! Forwarding to confirmation page...";
          
          // FORCED MANUAL REDIRECT MECHANISM READING INPUT VALUE
          const redirectTarget = formNode.querySelector('input[name="redirect"]')?.value;
          
          if (redirectTarget) {
            window.location.href = redirectTarget; 
          } else {
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

  // 3. Dynamic Category Filtering Loop Engine
  const productGrid = document.getElementById("productGrid");
  
  function applyProductFilter(filterValue) {
    const targetButton = document.querySelector(`.filter-btn[data-filter="${filterValue}"]`);
    if (!targetButton) return;

    // Toggle active state visual classes on the filter layout list buttons
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    targetButton.classList.add("active");

    // Show or hide elements inside the card grid matrix
    document.querySelectorAll(".product-item").forEach(item => {
      if (filterValue === "all" || item.dataset.category === filterValue) {
        item.style.display = "block";
        item.classList.add("fade-in");
      } else {
        item.style.display = "none";
      }
    });
  }

  if (productGrid) {
    // Handle live click events inside the page catalog filters
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        applyProductFilter(filter);
      });
    });

    // Parse incoming URL parameter targets (?category=xyz) from external clicks
    const urlParams = new URLSearchParams(window.location.search);
    const targetCategory = urlParams.get('category');
    
    if (targetCategory) {
      applyProductFilter(targetCategory);
    }
  }
});
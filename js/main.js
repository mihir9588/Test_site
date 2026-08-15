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

/**
 * Tantronics - Modern Multi-Page Core Script Logic with Web3Forms AJAX Handling,
 * Cross-Page Category Filter Mapping, and 3D WebGL Background Integration Support.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Footer Year Configuration
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Toggle Controller
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // 3. Web3Forms Asynchronous AJAX Processing Engine
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
        statusNode.className = "mt-3 text-center text-red-400 text-sm font-bold";
        statusNode.textContent = "Please fill in all fields correctly.";
        return;
      }

      statusNode.className = "mt-3 text-center text-[#ff7f2a] text-sm font-bold";
      statusNode.textContent = "Processing technical parameters transmission...";

      const formData = new FormData(this);

      fetch(this.action, {
        method: this.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(async (response) => {
        if (response.status === 200) {
          statusNode.className = "mt-3 text-center text-green-400 text-sm font-bold";
          statusNode.textContent = "Success! Forwarding to confirmation page...";
          
          const redirectTarget = formNode.querySelector('input[name="redirect"]')?.value;
          
          if (redirectTarget) {
            window.location.href = redirectTarget; 
          } else {
            formNode.reset();
          }
        } else {
          const json = await response.json();
          statusNode.className = "mt-3 text-center text-red-400 text-sm font-bold";
          statusNode.textContent = json.message || "Transmission network anomaly encountered.";
        }
      })
      .catch(() => {
        statusNode.className = "mt-3 text-center text-red-400 text-sm font-bold";
        statusNode.textContent = "Error establishing gateway link.";
      });
    });
  });

  // 4. Dynamic Category Filtering Loop Engine
  const productGrid = document.getElementById("productGrid");
  
  function applyProductFilter(filterValue) {
    const targetButton = document.querySelector(`.filter-btn[data-filter="${filterValue}"]`);
    if (!targetButton) return;

    // Toggle active state visual styling on filter buttons
    document.querySelectorAll(".filter-btn").forEach(b => {
      b.className = "filter-btn px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700 text-zinc-300 hover:border-[#ff7f2a] transition-all cursor-pointer";
    });
    
    // Check if it's the custom R&D page or OEM products page for accent colors
    const isCyanTheme = targetButton.classList.contains('border-cyan-400') || window.location.pathname.includes('custom-projects');
    if (isCyanTheme) {
      targetButton.className = "filter-btn active px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-cyan-500 text-zinc-950 shadow-md transition-all cursor-pointer";
    } else {
      targetButton.className = "filter-btn active px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#ff7f2a] text-zinc-950 shadow-md transition-all cursor-pointer";
    }

    // Show or hide elements inside the card grid matrix
    document.querySelectorAll(".product-item").forEach(item => {
      if (filterValue === "all" || item.dataset.category === filterValue) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  }

  if (productGrid) {
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        applyProductFilter(filter);
      });
    });

    // Parse incoming URL parameter targets (?category=xyz) from external links
    const urlParams = new URLSearchParams(window.location.search);
    const targetCategory = urlParams.get('category');
    
    if (targetCategory) {
      applyProductFilter(targetCategory);
    }
  }
});
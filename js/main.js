/**
 * Tantronics - Re-engineered Interactive Grid Script
 */
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  const formsSetup = [
    { formId: 'contactForm', statusId: 'formStatus' },
    { formId: 'homeEnquiryForm', statusId: 'homeFormStatus' }
  ];

  formsSetup.forEach(({ formId, statusId }) => {
    const activeForm = document.getElementById(formId);
    const activeStatus = document.getElementById(statusId);

    activeForm?.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!activeStatus) return;

      if (!this.checkValidity()) {
        activeStatus.className = "mt-3 text-center text-danger small fw-bold";
        activeStatus.textContent = "Please fill inside all validation loops correctly.";
        return;
      }

      activeStatus.className = "mt-3 text-center text-warning small fw-bold";
      activeStatus.textContent = "Processing parameter transmission across API node...";

      const rawPayload = new FormData(this);

      fetch(this.action, {
        method: this.method,
        body: rawPayload,
        headers: { 'Accept': 'application/json' }
      })
      .then(async (res) => {
        if (res.status === 200) {
          activeStatus.className = "mt-3 text-center text-success small fw-bold";
          activeStatus.textContent = "Transmission successful! Transferring client layout window...";
          
          const redirectTarget = activeForm.querySelector('input[name="redirect"]')?.value;
          if (redirectTarget) {
            window.location.href = redirectTarget;
          } else {
            activeForm.reset();
          }
        } else {
          const parsingErr = await res.json();
          activeStatus.className = "mt-3 text-center text-danger small fw-bold";
          activeStatus.textContent = parsingErr.message || "An transmission mismatch logic occurred.";
        }
      })
      .catch(() => {
        activeStatus.className = "mt-3 text-center text-danger small fw-bold";
        activeStatus.textContent = "Gateway communication fault detected.";
      });
    });
  });

  const productGrid = document.getElementById("productGrid");
  if (productGrid) {
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const categoryToken = btn.dataset.filter;
        document.querySelectorAll(".product-item").forEach(card => {
          if (categoryToken === "all" || card.dataset.category === categoryToken) {
            card.style.display = "block";
            card.classList.add("fade-in");
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }
});
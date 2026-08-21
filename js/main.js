/**
 * Tantronics Industries LLP - Shared Site Script
 * Handles footer year, mobile navigation, Web3Forms submissions,
 * and category filtering for OEM, Automation Projects, and Custom Projects.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");

      const icon = mobileMenuBtn.querySelector("i");

      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
      }
    });
  }

  // Web3Forms AJAX handling
  const formsConfig = [
    {
      formId: "contactForm",
      statusId: "formStatus"
    },
    {
      formId: "homeEnquiryForm",
      statusId: "homeFormStatus"
    }
  ];

  formsConfig.forEach(({ formId, statusId }) => {
    const formNode = document.getElementById(formId);
    const statusNode = document.getElementById(statusId);

    if (!formNode || !statusNode) return;

    formNode.addEventListener("submit", async function (event) {
      event.preventDefault();

      if (!this.checkValidity()) {
        statusNode.className =
          "mt-3 text-center text-red-400 text-sm font-bold";

        statusNode.textContent =
          "Please fill in all fields correctly.";

        this.reportValidity();

        return;
      }

      statusNode.className =
        "mt-3 text-center text-[#ff7f2a] text-sm font-bold";

      statusNode.textContent =
        "Sending your enquiry...";

      try {
        const response = await fetch(this.action, {
          method: this.method || "POST",

          body: new FormData(this),

          headers: {
            Accept: "application/json"
          }
        });

        const result = await response
          .json()
          .catch(() => ({}));

        if (response.ok) {
          statusNode.className =
            "mt-3 text-center text-green-400 text-sm font-bold";

          statusNode.textContent =
            "Success! Forwarding to the confirmation page...";

          const redirectTarget =
            formNode.querySelector(
              'input[name="redirect"]'
            )?.value;

          if (redirectTarget) {
            window.location.href = redirectTarget;
          } else {
            formNode.reset();
          }
        } else {
          statusNode.className =
            "mt-3 text-center text-red-400 text-sm font-bold";

          statusNode.textContent =
            result.message ||
            "Unable to send your enquiry. Please try again.";
        }
      } catch (error) {
        statusNode.className =
          "mt-3 text-center text-red-400 text-sm font-bold";

        statusNode.textContent =
          "A network error occurred. Please try again.";
      }
    });
  });

  // Product category filtering
  const productGrid =
    document.getElementById("productGrid");

  const filterButtons = [
    ...document.querySelectorAll(".filter-btn")
  ];

  if (!productGrid || !filterButtons.length) return;

  // Custom Projects uses cyan accent.
  // OEM Products and Automation Projects use orange accent.
  const isCyanTheme =
    window.location.pathname.includes(
      "custom-projects.html"
    );

  const activeClass = isCyanTheme
    ? "bg-cyan-500 text-zinc-950 border-cyan-400"
    : "bg-[#ff7f2a] text-zinc-950 border-[#ff7f2a]";

  function setButtonState(activeButton) {
    filterButtons.forEach((button) => {
      button.classList.remove(
        "active",
        "bg-cyan-500",
        "bg-[#ff7f2a]",
        "text-zinc-950",
        "border-cyan-400",
        "border-[#ff7f2a]"
      );

      button.classList.add(
        "bg-zinc-900",
        "border-zinc-700",
        "text-zinc-300"
      );
    });

    activeButton.classList.remove(
      "bg-zinc-900",
      "border-zinc-700",
      "text-zinc-300"
    );

    activeButton.classList.add("active");

    activeClass
      .split(" ")
      .forEach((className) => {
        activeButton.classList.add(className);
      });
  }

  function applyProductFilter(
    filterValue,
    updateUrl = false
  ) {
    const targetButton = filterButtons.find(
      (button) =>
        button.dataset.filter === filterValue
    );

    if (!targetButton) {
      return false;
    }

    setButtonState(targetButton);

    document
      .querySelectorAll(".product-item")
      .forEach((item) => {
        const shouldShow =
          filterValue === "all" ||
          item.dataset.category === filterValue;

        item.style.display =
          shouldShow ? "flex" : "none";

        if (shouldShow) {
          item.classList.remove("fade-in");

          // Restart animation
          void item.offsetWidth;

          item.classList.add("fade-in");
        }
      });

    // Update category parameter without reloading the page
    if (updateUrl) {
      const url =
        new URL(window.location.href);

      if (filterValue === "all") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set(
          "category",
          filterValue
        );
      }

      window.history.replaceState(
        {},
        "",
        url
      );
    }

    return true;
  }

  // Filter button click events
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyProductFilter(
        button.dataset.filter,
        true
      );
    });
  });

  // Apply category from URL.
  // Example:
  // oem-products.html?category=mitsubishi-vfd
  const requestedCategory =
    new URLSearchParams(
      window.location.search
    ).get("category");

  if (requestedCategory) {
    const categoryApplied =
      applyProductFilter(requestedCategory);

    // If the URL category does not exist,
    // safely fall back to All Products.
    if (!categoryApplied) {
      applyProductFilter("all");
    }
  } else {
    const defaultButton =
      filterButtons.find(
        (button) =>
          button.dataset.filter === "all"
      ) || filterButtons[0];

    if (defaultButton) {
      applyProductFilter(
        defaultButton.dataset.filter
      );
    }
  }
});
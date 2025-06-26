// Modal functionality
function openModal() {
  const modal = document.getElementById("applicationModal");
  modal.style.display = "block";
  document.body.style.overflow = "hidden";

  // Ensure modal is scrollable
  modal.scrollTop = 0;
}

function closeModal() {
  const modal = document.getElementById("applicationModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside
document.addEventListener("click", function (event) {
  const modal = document.getElementById("applicationModal");
  if (event.target === modal) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const modal = document.getElementById("applicationModal");
    if (modal.style.display === "block") {
      closeModal();
    }
  }
});

// Form submission with better validation
function submitApplication(event) {
  event.preventDefault();

  // Get form element
  const form = document.getElementById("applicationForm");

  // Check if form is valid
  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }

  // Get form data
  const formData = new FormData(form);
  const applicationData = {};

  // Build application object
  for (let [key, value] of formData.entries()) {
    applicationData[key] = value.trim();
  }

  // Validate required fields
  const requiredFields = [
    "fullName",
    "email",
    "phone",
    "position",
    "experience",
    "availability",
  ];
  const missingFields = requiredFields.filter(
    (field) => !applicationData[field]
  );

  if (missingFields.length > 0) {
    alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
    return false;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(applicationData.email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  // Simulate successful submission
  console.log("Application Data:", applicationData);

  // Show loading state
  const submitBtn = form.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Submitting...";
  submitBtn.disabled = true;

  // Simulate API call delay
  setTimeout(() => {
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    // Show success message
    alert(
      `Thank you ${applicationData.fullName}!\n\nYour application for ${
        applicationData.position
      } has been submitted successfully.\n\nWe will review your application and contact you at ${
        applicationData.email
      } within 3-5 business days.\n\nApplication ID: ${Date.now()}`
    );

    // Reset form and close modal
    form.reset();
    closeModal();

    // Optional: Store application in localStorage for demo
    const applications = JSON.parse(
      localStorage.getItem("applications") || "[]"
    );
    applications.push({
      ...applicationData,
      submittedAt: new Date().toISOString(),
      applicationId: Date.now(),
    });
    localStorage.setItem("applications", JSON.stringify(applications));
  }, 1500);

  return false;
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.background = "white";
    header.style.backdropFilter = "none";
  }
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".feature-card, .why-card, .transform-card"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Add loading animation
window.addEventListener("load", function () {
  document.body.style.opacity = "1";
});

// Initialize page
document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.5s ease";

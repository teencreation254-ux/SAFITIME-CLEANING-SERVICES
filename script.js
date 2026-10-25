const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const bookingForm = document.getElementById("bookingForm");
const serviceSelect = document.getElementById("serviceSelect");
const formStatus = document.getElementById("formStatus");

document.getElementById("year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    serviceSelect.value = link.dataset.service;
  });
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;

  const formData = new FormData(bookingForm);
  const name = formData.get("name").trim();
  const phone = formData.get("phone").trim();
  const service = formData.get("service");
  const date = formData.get("date") || "Flexible / not specified";
  const location = formData.get("location").trim() || "Not specified";
  const details = formData.get("details").trim() || "No additional details provided.";

  const subject = `Cleaning Service Booking Request - ${service}`;
  const body = [
    "Hello Safitime Cleaning Services,",
    "",
    "I would like to request a booking. Here are my details:",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Service: ${service}`,
    `Preferred date: ${date}`,
    `Location / area: ${location}`,
    `Additional details: ${details}`,
    "",
    "Please contact me to confirm availability and pricing.",
    "",
    "Thank you."
  ].join("\n");

  formStatus.textContent = "Opening your email app with the booking request. Please review it and press Send.";
  window.location.href = `mailto:Safitimecleaning@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

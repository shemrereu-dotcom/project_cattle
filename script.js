const WHATSAPP = ""; // Add country code and digits only, for example 2547XXXXXXXX.

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealItems = document.querySelectorAll(
    ".intro-band, .section-heading, .animal-card, .farm-film, .home-cta, .story-copy, .value-grid article, .image-quote > div, .livestock-row, .availability-banner, .pinterest-note, .service-card, .process-steps article, .service-photo > div, .contact-copy, .enquiry-form"
  );
  revealItems.forEach((element) => element.classList.add("reveal"));
  document.body.classList.add("motion-ready");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -35px 0px" });

  revealItems.forEach((element) => revealObserver.observe(element));
}

const enquiryForm = document.getElementById("enquiry");
if (enquiryForm) {
  const interestField = document.getElementById("interest");
  const requestedInterest = new URLSearchParams(window.location.search).get("interest");
  if (requestedInterest && interestField) {
    const option = Array.from(interestField.options).find((item) => item.text.toLowerCase() === requestedInterest.toLowerCase());
    if (option) interestField.value = option.value;
  }

  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!WHATSAPP) {
      alert("Add your WhatsApp number in script.js first.");
      return;
    }

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const interest = interestField.value;
    const message = document.getElementById("message").value.trim();
    const text = [
      "Hello Rereu, my name is " + name + ".",
      phone ? "My phone number is " + phone + "." : "",
      interest ? "I'm interested in: " + interest + "." : "",
      message
    ].filter(Boolean).join(" ");
    window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(text), "_blank", "noopener,noreferrer");
  });
}

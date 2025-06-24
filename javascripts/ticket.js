document.addEventListener("scroll", function () {
  const ticketContainer = document.querySelector(".ticket-container");
  const ticketPosition = ticketContainer.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3;

  if (ticketPosition < screenPosition) {
    ticketContainer.style.opacity = "1";
    ticketContainer.style.transform = "translateY(0)";
  }
});

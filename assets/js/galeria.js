document.addEventListener("DOMContentLoaded", () => {
  // ✅ Nombres EXACTOS según tu /assets/img
  const images = [
    { src: "../assets/img/foto1.jpg", alt: "Imagen 1" },
    { src: "../assets/img/foto2.jpg", alt: "Imagen 2" },
    { src: "../assets/img/foto4.png", alt: "Imagen 3" },
    { src: "../assets/img/foto5.jpg", alt: "Imagen 4" },
    { src: "../assets/img/foto6.jpg", alt: "Imagen 5" },
  ];

  const imgEl = document.getElementById("carouselImg");
  const captionEl = document.getElementById("carouselCaption");
  const dotsEl = document.getElementById("carouselDots");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const msgEl = document.getElementById("galeriaMsg");

  if (!imgEl || !dotsEl || !prevBtn || !nextBtn) {
    console.error("Faltan IDs en galeria.html (carouselImg, carouselDots, prevBtn, nextBtn).");
    if (msgEl) msgEl.textContent = "Error: faltan elementos del carrusel en el HTML.";
    return;
  }

  let index = 0;

  // Crear dots
  dotsEl.innerHTML = images
    .map((_, i) => `<button class="dot" type="button" aria-label="Ir a imagen ${i + 1}" data-i="${i}"></button>`)
    .join("");

  const dots = Array.from(dotsEl.querySelectorAll(".dot"));

  function setActiveDot(i) {
    dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
  }

  function render(i) {
    const item = images[i];
    imgEl.src = item.src;
    imgEl.alt = item.alt;
    if (captionEl) captionEl.textContent = item.alt;
    setActiveDot(i);
  }

  function next() {
    index = (index + 1) % images.length;
    render(index);
  }

  function prev() {
    index = (index - 1 + images.length) % images.length;
    render(index);
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  dotsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".dot");
    if (!btn) return;
    index = Number(btn.dataset.i);
    render(index);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  imgEl.addEventListener("error", () => {
    if (msgEl) msgEl.textContent = "No se pudo cargar alguna imagen. Revisa /assets/img (nombres y extensiones).";
  });

  if (msgEl) msgEl.textContent = "";
  render(index);
});

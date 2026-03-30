const navToggle = document.getElementById("navToggle");
const navPanel = document.getElementById("navPanel");
const rotateHint = document.getElementById("rotateHint");
const rotateDismiss = document.getElementById("rotateDismiss");

function setNavOpen(open) {
  if (!navToggle || !navPanel) return;
  navToggle.setAttribute("aria-expanded", String(open));
  navPanel.hidden = !open;
  document.body.style.overflow = open ? "hidden" : "";
}

if (navToggle && navPanel) {
  navToggle.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    setNavOpen(!open);
  });

  navPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setNavOpen(false));
  });
}

if (rotateHint && rotateDismiss) {
  rotateDismiss.addEventListener("click", () => {
    rotateHint.classList.add("is-dismissed");
    rotateHint.classList.remove("is-visible");
  });

  const mq = window.matchMedia("(max-width: 900px) and (orientation: landscape)");
  function updateRotate() {
    if (rotateHint.classList.contains("is-dismissed")) return;
    rotateHint.classList.toggle("is-visible", mq.matches);
  }
  updateRotate();
  mq.addEventListener("change", updateRotate);
}

/* Scroll reveal */
const setupReveal = () => {
  const revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
  
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // If it's a staggered element, we could add a delay here if needed
          // but for now, the CSS transition handles the basic reveal.
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );

  revealEls.forEach((el) => io.observe(el));
};

setupReveal();

/* 3D Viewer Modal Logic */
const triggerRing3D = document.getElementById("triggerRing3D");
const modal3D = document.getElementById("modal3D");
const closeModal3D = document.getElementById("closeModal3D");

if (triggerRing3D && modal3D && closeModal3D) {
  triggerRing3D.addEventListener("click", () => {
    modal3D.hidden = false;
    document.body.style.overflow = "hidden";
  });

  const hideModal = () => {
    modal3D.hidden = true;
    document.body.style.overflow = "";
  };

  closeModal3D.addEventListener("click", hideModal);
  modal3D.querySelector(".modal__overlay").addEventListener("click", hideModal);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal3D.hidden) {
      hideModal();
    }
  });
}

/* Custom Cursor Interaction */
const cursor = document.getElementById("cursor");
if (cursor) {
  window.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  const interactives = document.querySelectorAll('a, button, .product-item, .pricing-card, .specs-row');
  interactives.forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("is-active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
  });
}


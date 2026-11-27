const scrollLayer = document.querySelector(".slide__layer--scroll");
const scrollSlide = scrollLayer && scrollLayer.closest(".slide--desktop");
const desktopQuery = window.matchMedia("(min-width: 769px)");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let animationFrame = 0;

function updateScrollLayer() {
  animationFrame = 0;

  if (!scrollLayer || !scrollSlide) {
    return;
  }

  if (!desktopQuery.matches || reducedMotionQuery.matches) {
    scrollLayer.style.transform = "";
    scrollLayer.style.filter = "";
    scrollLayer.style.opacity = "";
    return;
  }

  const progress = Math.min(
    1,
    Math.max(0, -scrollSlide.getBoundingClientRect().top / scrollSlide.offsetHeight)
  );

  scrollLayer.style.transform = `translateY(${progress * 200}px)`;
  scrollLayer.style.filter = `blur(${progress * 6}px)`;
  scrollLayer.style.opacity = `${1 - progress * 0.45}`;
}

function scheduleScrollLayerUpdate() {
  if (!animationFrame) {
    animationFrame = window.requestAnimationFrame(updateScrollLayer);
  }
}

window.addEventListener("scroll", scheduleScrollLayerUpdate, { passive: true });
window.addEventListener("resize", scheduleScrollLayerUpdate);
scheduleScrollLayerUpdate();
// Vanilla JS timeline nav: sticky, active highlight, smooth scroll
document.addEventListener('DOMContentLoaded', function () {
  const timeline = document.querySelector('.mastodon-timeline-nav');
  if (!timeline) return;

  const items = Array.from(timeline.querySelectorAll('li'));
  const targets = items.map(li => {
    const span = li.querySelector('span');
    const id = span && span.dataset && span.dataset.target;
    return id ? document.getElementById(id) : null;
  });

  const offsetTop = parseInt(getComputedStyle(timeline).top) || 0;
  const TIMELINE = { start: 190, step: 30 };
  let stickyTop = 0;
  let scrollTarget = false;

  function recalc() {
    timeline.classList.remove('fixed');
    const rect = timeline.getBoundingClientRect();
    stickyTop = rect.top + window.scrollY - offsetTop;
  }

  function onResize() {
    recalc();
    onScroll();
  }

  function onScroll() {
    const isFixed = timeline.classList.contains('fixed');
    if (window.scrollY > stickyTop) {
      if (!isFixed) {
        // Preserve current on-screen position and width when switching to fixed
        const rect = timeline.getBoundingClientRect();
        timeline.style.left = rect.left + 'px';
        timeline.style.width = rect.width + 'px';
        // Set top to current visual top so adding `fixed` doesn't jump
        timeline.style.top = rect.top + 'px';
        timeline.classList.add('fixed');
      }
    } else {
      if (isFixed) {
        timeline.classList.remove('fixed');
        // Remove inline positioning so nav returns to normal flow
        timeline.style.left = '';
        timeline.style.width = '';
        // Recalculate sticky offset after unfixing
        recalc();
      }
    }

    const viewLine = window.scrollY + window.innerHeight / 3;
    let active = -1;

    if (scrollTarget === false) {
      // Find the last index whose target element is above or equal to the viewLine
      for (let i = 0; i < items.length; i++) {
        const span = items[i].querySelector('span');
        if (!span) continue;
        const id = span.dataset && span.dataset.target;
        if (!id) continue;
        const el = document.getElementById(id);
        if (!el) continue;
        const elTop = el.getBoundingClientRect().top + window.scrollY;
        if (elTop <= viewLine) {
          active = i;
        } else {
          break;
        }
      }
    } else {
      active = scrollTarget;
    }

    // clamp upper bound only
    if (active >= items.length) active = items.length - 1;

    // set top position to slide the nav (similar to CodePen behavior)
    // If nav is fixed we adjust the inline `top` (viewport pixels). If not, this remains the offset inside its container.
    const targetTop = (active >= 0) ? (-active * TIMELINE.step + TIMELINE.start) : TIMELINE.start;
    timeline.style.top = targetTop + 'px';

    // update active class only when a valid active index exists
    items.forEach((li, idx) => li.classList.toggle('active', active >= 0 && idx === active));

    if (scrollTarget !== false && scrollTarget === active) {
      scrollTarget = false;
    }
  }

  // click handlers
  items.forEach((li, idx) => {
    const span = li.querySelector('span');
    if (!span) return;
    span.addEventListener('click', function () {
      const targetId = span.dataset.target;
      const el = document.getElementById(targetId);
      if (!el) return;
      scrollTarget = idx;
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  window.addEventListener('resize', onResize);
  window.addEventListener('scroll', onScroll);

  // initial
  recalc();
  onScroll();
});

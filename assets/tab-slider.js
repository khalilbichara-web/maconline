document.querySelectorAll('.tab-slider').forEach((section) => {
  const btns = section.querySelectorAll('.tab-slider__nav-btn');
  const slides = section.querySelectorAll('.tab-slider__slide');

  const activateTab = (btn) => {
    const target = btn.dataset.target;

    slides.forEach((slide) => {
      const isActive = slide.dataset.tab === target;
      slide.classList.toggle('is-active', isActive);
      slide.hidden = !isActive;
    });

    btns.forEach((tab) => {
      const isActive = tab === btn;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });
  };

  btns.forEach((btn, index) => {
    btn.addEventListener('click', () => activateTab(btn));

    btn.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

      event.preventDefault();
      const nextIndex = event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? btns.length - 1
          : (index + (event.key === 'ArrowRight' ? 1 : -1) + btns.length) % btns.length;
      btns[nextIndex].focus();
      activateTab(btns[nextIndex]);
    });
  });
});


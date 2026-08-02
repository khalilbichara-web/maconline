(() => {
  const init = (section) => {
    const navItems = Array.from(section.querySelectorAll('.vertical-slideshow__nav-item'));
    const navButtons = Array.from(section.querySelectorAll('.vertical-slideshow__nav-btn'));
    const panels = Array.from(section.querySelectorAll('.vertical-slideshow__panel'));

    if (!navItems.length || navItems.length !== panels.length) {
      return;
    }

    const setActive = (index) => {
      navItems.forEach((item, idx) => {
        const isActive = idx === index;
        item.classList.toggle('is-active', isActive);

        const btn = navButtons[idx];
        if (btn) {
          btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
          btn.setAttribute('tabindex', isActive ? '0' : '-1');
        }
      });

      panels.forEach((panel, idx) => {
        panel.classList.toggle('is-active', idx === index);
        panel.setAttribute('aria-hidden', idx === index ? 'false' : 'true');
      });
    };

    navButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const index = Number(button.dataset.index || 0);
        setActive(index);
      });

      button.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
          return;
        }

        event.preventDefault();
        const currentIndex = Number(button.dataset.index || 0);
        const nextIndex =
          event.key === 'ArrowDown'
            ? (currentIndex + 1) % navButtons.length
            : (currentIndex - 1 + navButtons.length) % navButtons.length;

        setActive(nextIndex);
        navButtons[nextIndex].focus();
      });
    });

    setActive(0);
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-vertical-slideshow]').forEach(init);
  });
})();

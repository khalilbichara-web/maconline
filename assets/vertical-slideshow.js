(() => {
  const init = (section) => {
    if (section.dataset.verticalSlideshowInit === 'true') {
      return;
    }

    section.dataset.verticalSlideshowInit = 'true';

    const navItems = Array.from(section.querySelectorAll('.vertical-slideshow__nav-item'));
    const navButtons = Array.from(section.querySelectorAll('.vertical-slideshow__nav-btn'));
    const panels = Array.from(section.querySelectorAll('.vertical-slideshow__panel'));

    if (!navItems.length || navItems.length !== panels.length) {
      return;
    }

    const setExpandedState = (item, isActive) => {
      const detail = item.querySelector('.vertical-slideshow__detail');
      const mobileVisual = item.querySelector('.vertical-slideshow__mobile-visual');
      const button = item.querySelector('.vertical-slideshow__nav-btn');

      if (button) {
        button.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      }

      [detail, mobileVisual].forEach((element) => {
        if (!element) {
          return;
        }

        element.classList.toggle('is-open', isActive);
        element.setAttribute('aria-hidden', isActive ? 'false' : 'true');

        if (isActive) {
          element.style.maxHeight = `${element.scrollHeight}px`;
        } else {
          element.style.maxHeight = '0px';
        }
      });
    };

    const setActive = (index) => {
      navItems.forEach((item, idx) => {
        const isActive = idx === index;
        item.classList.toggle('is-active', isActive);

        const btn = navButtons[idx];
        if (btn) {
          btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
          btn.setAttribute('tabindex', isActive ? '0' : '-1');
        }

        setExpandedState(item, isActive);
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

    const refreshActiveHeight = () => {
      const activeItem = navItems.find((item) => item.classList.contains('is-active'));
      if (!activeItem) {
        return;
      }

      const detail = activeItem.querySelector('.vertical-slideshow__detail');
      const mobileVisual = activeItem.querySelector('.vertical-slideshow__mobile-visual');

      [detail, mobileVisual].forEach((element) => {
        if (element && element.classList.contains('is-open')) {
          element.style.maxHeight = `${element.scrollHeight}px`;
        }
      });
    };

    window.addEventListener('resize', refreshActiveHeight);

    section.querySelectorAll('img').forEach((img) => {
      img.addEventListener('load', refreshActiveHeight);
    });

    setActive(0);
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-vertical-slideshow]').forEach(init);
  });

  document.addEventListener('shopify:section:load', (event) => {
    const section = event.target.querySelector('[data-vertical-slideshow]');
    if (section) {
      init(section);
    }
  });
})();

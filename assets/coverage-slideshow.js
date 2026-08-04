(() => {
  const init = (section) => {
    if (section.dataset.coverageSlideshowInit === 'true') {
      return;
    }

    const tabs = Array.from(section.querySelectorAll('[data-coverage-target]'));
    const panels = Array.from(section.querySelectorAll('[data-coverage-panel]'));

    if (!tabs.length || tabs.length !== panels.length) {
      return;
    }

    const activate = (index) => {
      tabs.forEach((tab, tabIndex) => {
        const isActive = tabIndex === index;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        tab.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      panels.forEach((panel, panelIndex) => {
        const isActive = panelIndex === index;
        panel.classList.toggle('is-active', isActive);
        panel.hidden = !isActive;
      });
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(index));

      tab.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
          return;
        }

        event.preventDefault();

        const nextIndex =
          event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? tabs.length - 1
              : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;

        tabs[nextIndex].focus();
        activate(nextIndex);
      });
    });

    activate(0);
    section.dataset.coverageSlideshowInit = 'true';
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-coverage-slideshow]').forEach(init);
  });

  document.addEventListener('shopify:section:load', (event) => {
    const container = event.target;
    if (!container || !container.querySelectorAll) {
      return;
    }

    container.querySelectorAll('[data-coverage-slideshow]').forEach((section) => {
      section.dataset.coverageSlideshowInit = 'false';
      init(section);
    });
  });
})();
(() => {
  const init = (section) => {
    const tabs = Array.from(section.querySelectorAll('[data-tradein-target]'));
    const panels = Array.from(section.querySelectorAll('[data-tradein-panel]'));

    if (!tabs.length || tabs.length !== panels.length) {
      return;
    }

    const activate = (index) => {
      tabs.forEach((tab, tabIndex) => {
        const active = tabIndex === index;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
        tab.setAttribute('tabindex', active ? '0' : '-1');
      });

      panels.forEach((panel, panelIndex) => {
        const active = panelIndex === index;
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
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
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-tradein-devices-table]').forEach(init);
  });
})();
(() => {
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  const label = document.querySelector('.theme-label');
  const meta = document.querySelector('meta[name="theme-color"]');
  let storedTheme;
  try { storedTheme = localStorage.getItem('semen-theme'); } catch (_) {}
  const preferredDark = window.matchMedia('(prefers-color-scheme: dark)');
  const setTheme = (theme) => {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    if (button) {
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', 'Switch to ' + (dark ? 'light' : 'dark') + ' theme');
    }
    if (label) label.textContent = dark ? 'Dark' : 'Light';
    if (meta) meta.content = dark ? '#1c211e' : '#f8f7f3';
  };
  setTheme(storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : (preferredDark.matches ? 'dark' : 'light'));
  if (button) {
    button.hidden = false;
    button.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      storedTheme = next;
      setTheme(next);
      try { localStorage.setItem('semen-theme', next); } catch (_) {}
    });
  }
  preferredDark.addEventListener('change', event => {
    if (!storedTheme) setTheme(event.matches ? 'dark' : 'light');
  });
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
  const links = [...document.querySelectorAll('.page-nav a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const visible = new Set();
    const update = () => {
      const active = sections.filter(section => visible.has(section.id))[0];
      if (!active) return;
      links.forEach(link => {
        if (link.hash === '#' + active.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target.id) : visible.delete(entry.target.id));
      update();
    }, { rootMargin: '-8% 0px -40% 0px' });
    sections.forEach(section => observer.observe(section));
  }
})();

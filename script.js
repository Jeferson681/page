document.addEventListener('DOMContentLoaded', () => {
  // Atualiza ano do rodapé
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // SVG icons (small, self-contained)
  const moonSVG = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/></svg>';
  const sunSVG = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6.76 4.84l-1.8-1.79L3.17 5.84l1.79 1.79 1.8-2.79zM1 13h3v-2H1v2zm10 8h2v-3h-2v3zm7.04-2.46l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM17 11a5 5 0 1 1-10 0 5 5 0 0 1 10 0zM4.21 18.36L2.42 20.15l1.79 1.79 1.79-1.79-1.79-1.79zM20 13h3v-2h-3v2zm-7-9h2V1h-2v3z" fill="currentColor"/></svg>';

  function updateIcon() {
    if (!toggle) return;
    const iconEl = toggle.querySelector('.theme-icon');
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (iconEl) iconEl.innerHTML = isDark ? sunSVG : moonSVG;
    // keep aria-label descriptive
    toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    toggle.setAttribute('aria-label', isDark ? 'Alternar tema — modo atual: Escuro' : 'Alternar tema — modo atual: Claro');
    toggle.setAttribute('title', isDark ? 'Modo escuro (clicar para alternar)' : 'Modo claro (clicar para alternar)');
  }

  // Load saved preference or detect system preference when none
  const saved = localStorage.getItem('theme');
  if (saved) {
    root.setAttribute('data-theme', saved);
  } else {
    // Detect OS-level preference on first visit
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

  updateIcon();

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateIcon();
    });
  }
});

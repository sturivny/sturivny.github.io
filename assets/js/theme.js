(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');

  function getPreferredTheme() {
    try {
      var stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch (e) {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggle) {
      var isDark = theme === 'dark';
      toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  function setTheme(theme) {
    applyTheme(theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
  }

  applyTheme(getPreferredTheme());

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (event) {
    try {
      if (!localStorage.getItem('theme')) {
        applyTheme(event.matches ? 'dark' : 'light');
      }
    } catch (e) {}
  });
})();

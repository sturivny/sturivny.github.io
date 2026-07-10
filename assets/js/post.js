(function () {
  var copyButton = document.getElementById('copy-link-button');
  var copyStatus = document.getElementById('copy-link-status');
  var progressBar = document.getElementById('reading-progress-bar');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (copyButton) {
    copyButton.addEventListener('click', function () {
      var url = copyButton.getAttribute('data-url');
      if (!url) return;

      function showStatus(message) {
        if (copyStatus) {
          copyStatus.textContent = message;
          copyStatus.classList.remove('visually-hidden');
          window.setTimeout(function () {
            copyStatus.classList.add('visually-hidden');
          }, 2000);
        }
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          showStatus('Link copied');
        }).catch(function () {
          showStatus('Could not copy link');
        });
      } else {
        showStatus('Copy not supported');
      }
    });
  }

  if (progressBar && !reducedMotion) {
    function updateProgress() {
      var article = document.querySelector('.post-content');
      if (!article) return;

      var rect = article.getBoundingClientRect();
      var articleTop = rect.top + window.scrollY;
      var articleHeight = article.offsetHeight;
      var viewport = window.innerHeight;
      var scrolled = window.scrollY - articleTop + viewport * 0.25;
      var progress = Math.min(Math.max(scrolled / articleHeight, 0), 1);
      progressBar.style.width = (progress * 100) + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }
})();

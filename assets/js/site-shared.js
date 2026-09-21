(function () {
  const currentPath = window.location.pathname.replace(/\\/g, '/');
  const isProjectPage = currentPath.includes('/projects/');
  const root = isProjectPage ? '../' : './';

  const navHtml = `
    <header class="nav">
      <a class="brand" href="${root}index.html">Abhi</a>
      <nav>
        <a href="${root}index.html#projects">Projects</a>
        <a href="${root}about.html">About</a>
        <a href="${root}resume.pdf">Resume</a>
      </nav>
    </header>
  `;

  const footerHtml = `
    <footer>
      <div class="wrap">
        <a href="https://github.com/abhi5301">GitHub</a>
        <a href="https://linkedin.com/in/abhipatel017">LinkedIn</a>
        <a href="mailto:apatel7@wpi.edu">Email</a>
      </div>
    </footer>
  `;

  function injectSharedMarkup() {
    const headerTarget = document.querySelector('[data-site-header]');
    const footerTarget = document.querySelector('[data-site-footer]');

    if (headerTarget) {
      headerTarget.outerHTML = navHtml.trim();
    }

    if (footerTarget) {
      footerTarget.outerHTML = footerHtml.trim();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSharedMarkup);
  } else {
    injectSharedMarkup();
  }
})();

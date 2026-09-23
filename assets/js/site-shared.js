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
        <a href="${root}assets/resume/Abhi Patel Resume.pdf">Resume</a>
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

  function initGalleryLightbox() {
    const galleryLinks = document.querySelectorAll('.gal a');
    if (!galleryLinks.length) return;

    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.setAttribute('hidden', 'hidden');
    modal.innerHTML = `
      <div class="gallery-modal__backdrop" aria-hidden="true"></div>
      <div class="gallery-modal__panel" role="dialog" aria-modal="true" aria-label="Expanded image view">
        <button class="gallery-modal__close" type="button" aria-label="Close image">×</button>
        <img class="gallery-modal__image" src="" alt="Expanded project image">
      </div>
    `;

    document.body.appendChild(modal);

    const image = modal.querySelector('.gallery-modal__image');
    const closeButton = modal.querySelector('.gallery-modal__close');
    const backdrop = modal.querySelector('.gallery-modal__backdrop');

    function closeModal() {
      modal.setAttribute('hidden', 'hidden');
      image.removeAttribute('src');
      image.alt = 'Expanded project image';
      document.body.style.overflow = '';
    }

    galleryLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const img = link.querySelector('img');
        if (!img) return;

        image.src = img.src;
        image.alt = img.alt || 'Expanded project image';
        modal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
      });
    });

    closeButton.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !modal.hasAttribute('hidden')) {
        closeModal();
      }
    });
  }

  function initSite() {
    injectSharedMarkup();
    initGalleryLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSite);
  } else {
    initSite();
  }
})();

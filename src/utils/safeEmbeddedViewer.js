export const detachEmbeddedViewer = (container) => {
  if (!container) return;

  const iframe = container.querySelector('iframe');
  if (iframe) {
    try {
      iframe.src = 'about:blank';
    } catch {
      // ignore cross-origin cleanup errors
    }
  }

  window.requestAnimationFrame(() => {
    try {
      container.replaceChildren();
    } catch {
      // ignore if container was already removed
    }
  });
};

export const mountEmbeddedViewer = (container, { contentUrl, title, className = '' }) => {
  if (!container || !contentUrl) return null;

  detachEmbeddedViewer(container);

  const iframe = document.createElement('iframe');
  iframe.title = title || 'Document';
  iframe.src = contentUrl;
  iframe.className = className;
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('loading', 'lazy');
  container.appendChild(iframe);

  return iframe;
};

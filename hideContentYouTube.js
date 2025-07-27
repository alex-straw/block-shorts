// ===== Constants =====
const SHORTS_SELECTORS = [
  'ytd-rich-shelf-renderer[is-shorts]',
  'ytd-rich-shelf-renderer.is-shorts',
  'ytd-rich-shelf-renderer[class*="is-shorts"]',
  'ytd-reel-shelf-renderer',
  'ytd-mini-guide-entry-renderer[aria-label="Shorts"]',
  'a#thumbnail[href*="/shorts/"]'
].join(', ');

// ===== Inject CSS at document_start =====
const style = document.createElement('style');
style.textContent = `
  /* Hide Shorts shelves/items and standalone Shorts thumbnails */
  ${SHORTS_SELECTORS} {
    display: none !important;
  }
`;
document.documentElement.appendChild(style);

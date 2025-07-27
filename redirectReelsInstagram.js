// Instagram obfuscates all their HTML tags with hashes, and makes it very hard to hook in.
// Forced to go with an interval check for the current path

// Only top-level context
const inIframe   = window.top !== window.self;

if (!inIframe) {
    function maybeRedirectInstagram() {
        const p = location.pathname;
        if (p.startsWith('/reel') || p.startsWith('/explore')) {
            location.replace('https://www.instagram.com/');
        }
    }

    // Initial redirect
    maybeRedirectInstagram();

    // SPA nav fallback via polling
    let lastPath = location.pathname;
    setInterval(() => {
    const newPath = location.pathname;
        if (newPath !== lastPath) {
            lastPath = newPath;
            maybeRedirectInstagram();
        }
    }, 200);
}
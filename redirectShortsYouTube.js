const inIframe   = window.top !== window.self;

// Only run in the top-level frame
if (!inIframe) {
    function maybeRedirectYoutube() {
        if (window.location.pathname.startsWith('/shorts/')) {
            window.location.replace('https://www.youtube.com/');
        }
    }

    // Immediate redirect on load
    maybeRedirectYoutube();

    // Catch back/forward nav
    window.addEventListener('popstate', maybeRedirectYoutube);

    const hasHistory = typeof window.history !== 'undefined';  // If we’ve got a history API, wrap the SPA methods
    if (hasHistory) {
        for (const fn of ['pushState', 'replaceState']) {
            const original = window.history[fn];
            
            if (typeof original !== 'function') continue;

            window.history[fn] = function (...args) {
                // preserve return value (undefined normally)
                const ret = original.apply(this, args);
                maybeRedirectYoutube();
                return ret;
            };
        }
    }
}

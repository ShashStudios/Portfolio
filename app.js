// Simple SPA router
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const internalLinks = document.querySelectorAll('[data-internal]');

    // Map route paths to page IDs
    const routeMap = {
        '/': 'home',
        '/projects': 'projects',
        '/location': 'location',
        '/experience': 'experience'
    };

    function navigateTo(pageName) {
        // Hide all pages
        pages.forEach(p => p.classList.remove('active'));

        // Deactivate all nav links
        navLinks.forEach(l => l.classList.remove('active'));

        // Show target page
        const targetPage = document.getElementById(`page-${pageName}`);
        if (targetPage) {
            targetPage.classList.add('active');

            // Re-trigger fade-in animations
            const fadeElements = targetPage.querySelectorAll('.fade-in');
            fadeElements.forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; // Force reflow
                el.style.animation = '';
            });
        }

        // Activate corresponding nav link
        const targetLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }

        // Update URL without reload
        const path = pageName === 'home' ? '/' : `/${pageName}`;
        window.history.pushState({ page: pageName }, '', path);

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = link.getAttribute('data-page');
            navigateTo(pageName);
        });
    });

    // Handle internal links (like "angel invest" linking to projects)
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = link.getAttribute('data-internal');
            navigateTo(pageName);
        });
    });

    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.page) {
            navigateTo(e.state.page);
        } else {
            // Determine page from URL
            const path = window.location.pathname;
            const pageName = routeMap[path] || 'home';
            navigateTo(pageName);
        }
    });

    // Handle initial page load based on URL
    const initialPath = window.location.pathname;
    const initialPage = routeMap[initialPath] || 'home';

    // Set initial state
    if (initialPage !== 'home') {
        navigateTo(initialPage);
    }

    // Replace initial history state
    window.history.replaceState({ page: initialPage }, '', initialPath);
});

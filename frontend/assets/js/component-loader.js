// WanderTale Component Loader
const ComponentLoader = {
    async load(name, targetId) {
        try {
            const res = await fetch(`/shared/components/${name}.html`);
            if (!res.ok) return console.warn(`Component not found: ${name}`);

            const target = document.getElementById(targetId);
            if (target) {
                target.innerHTML = await res.text();
                this.init(name);
            }
        } catch (e) {
            console.error(`Load component error: ${name}`, e);
        }
    },

    init(name) {
        const user = window.AuthGuard?.getUser();

        if (name === 'sidebar-app') {
            this.highlightNav();
            if (user) {
                const nameEl = document.getElementById('user-name');
                const emailEl = document.getElementById('user-email');
                if (nameEl) nameEl.textContent = user.fullName || 'User';
                if (emailEl) emailEl.textContent = '@' + (user.email?.split('@')[0] || 'user');
            }
        }

        if (name === 'header-public' || name === 'header-app') {
            this.initHeader(user, name === 'header-app');
        }

        // Initialize i18n after component load
        if (window.i18n) window.i18n.init();
    },

    highlightNav() {
        const path = window.location.pathname;
        document.querySelectorAll('nav a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && path.includes(href.replace('.html', ''))) {
                link.classList.add('bg-primary/10', 'text-primary');
            }
        });
    },

    initHeader(user, isApp) {
        const isAuth = window.AuthGuard?.isAuthenticated?.() ?? false;

        // Toggle visibility
        document.getElementById('auth-guest')?.classList.toggle('hidden', isAuth);
        document.getElementById('auth-user')?.classList.toggle('hidden', !isAuth);

        // Reveal auth section (remove initial opacity-0 once header is initialized)
        const authSection = document.getElementById('auth-section');
        if (authSection) {
            authSection.classList.remove('opacity-0');
            authSection.classList.add('opacity-100');
        }

        if (isAuth && user) {
            const avatarImg = document.getElementById('avatar-img') || document.getElementById('profile-avatar-img');
            if (avatarImg && user.avatar) avatarImg.src = user.avatar;
        }

        // Setup dropdown
        const btn = document.getElementById(isApp ? 'profile-avatar-btn' : 'avatar-btn');
        const dropdown = document.getElementById(isApp ? 'profile-dropdown' : 'avatar-dropdown');
        if (btn && dropdown) this.setupDropdown(btn, dropdown);

        // Logout
        document.getElementById('logout-btn')?.addEventListener('click', () => window.AuthGuard?.logout());

        // Header scroll effect (apply after component has been injected)
        const header = document.getElementById('main-header');
        if (header) {
            const handleScroll = () => {
                if (window.scrollY > 100) {
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                }
            };
            window.addEventListener('scroll', handleScroll, { passive: true });
            // Run once on init so state matches current scroll position
            handleScroll();
        }
    },

    setupDropdown(btn, dropdown) {
        let isOpen = false;
        const toggle = () => {
            isOpen = !isOpen;
            dropdown.classList.toggle('opacity-0', !isOpen);
            dropdown.classList.toggle('scale-95', !isOpen);
            dropdown.classList.toggle('pointer-events-none', !isOpen);
            dropdown.classList.toggle('opacity-100', isOpen);
            dropdown.classList.toggle('scale-100', isOpen);
        };

        btn.addEventListener('click', (e) => { e.stopPropagation(); toggle(); });
        document.addEventListener('click', () => { if (isOpen) toggle(); });
        dropdown.addEventListener('click', (e) => e.stopPropagation());
    }
};

window.ComponentLoader = ComponentLoader;

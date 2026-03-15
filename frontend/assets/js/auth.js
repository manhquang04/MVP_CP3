// WanderTale Authentication System (Combined)
class AuthGuard {
    static TOKEN_KEY = 'token';
    static USER_KEY = 'user';

    // Auth state
    static isAuthenticated() { return !!localStorage.getItem(this.TOKEN_KEY); }
    static getToken() { return localStorage.getItem(this.TOKEN_KEY); }
    static getUser() {
        const data = localStorage.getItem(this.USER_KEY);
        return data ? JSON.parse(data) : null;
    }

    // Auth actions
    static login(token, user) {
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }

    static logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        window.location.href = '/index.html';
    }

    // Redirect helpers
    static requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = `/auth/login.html?redirect=${encodeURIComponent(window.location.pathname)}`;
            return false;
        }
        return true;
    }

    static redirectIfAuthenticated() {
        if (this.isAuthenticated()) {
            const redirect = new URLSearchParams(window.location.search).get('redirect') || '/public/community-stories.html';
            window.location.href = redirect;
        }
    }
}

// Auth API
class AuthAPI {
    static async signup(fullName, email, password) {
        const res = await window.api.post('/api/auth/signup', { fullName, email, password });
        if (res.success) AuthGuard.login(res.token, res.user);
        return res;
    }

    static async signin(email, password) {
        const res = await window.api.post('/api/auth/signin', { email, password });
        if (res.success) AuthGuard.login(res.token, res.user);
        return res;
    }

    static async getCurrentUser() {
        const res = await window.api.get('/api/auth/me');
        if (res.success) localStorage.setItem('user', JSON.stringify(res.user));
        else if (res.message) AuthGuard.logout();
        return res;
    }

    static async changePassword(currentPassword, newPassword) {
        return window.api.post('/api/auth/change-password', { currentPassword, newPassword });
    }
}

window.AuthGuard = AuthGuard;
window.AuthAPI = AuthAPI;
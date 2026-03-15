// WanderTale Config & API Base
window.WanderTaleConfig = {
    API_URL: 'https://surprised-olimpia-0manhquang0-6c9e70d9.koyeb.app',
    API_BASE_URL: 'https://surprised-olimpia-0manhquang0-6c9e70d9.koyeb.app/api',
    MAPBOX_ACCESS_TOKEN: window.__MAPBOX_TOKEN__ || '',
    PLACEHOLDER_IMG: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop'
};

// API helper
window.api = {
    get token() { return localStorage.getItem('token'); },

    async request(endpoint, options = {}) {
        const url = endpoint.startsWith('http') ? endpoint : window.WanderTaleConfig.API_URL + endpoint;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        if (this.token) headers['Authorization'] = `Bearer ${this.token}`;

        try {
            const res = await fetch(url, { ...options, headers });
            return await res.json();
        } catch (e) {
            console.error('API Error:', e);
            return { success: false, message: 'Lỗi kết nối server' };
        }
    },

    get: (endpoint) => window.api.request(endpoint),
    post: (endpoint, body) => window.api.request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    put: (endpoint, body) => window.api.request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (endpoint) => window.api.request(endpoint, { method: 'DELETE' })
};

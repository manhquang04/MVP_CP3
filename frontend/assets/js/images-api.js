// WanderTale Images API
const ImagesAPI = {
    PLACEHOLDER: window.WanderTaleConfig?.PLACEHOLDER_IMG || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',

    async getPlaceImageUrl(query, destination) {
        const search = [query, destination].filter(Boolean).join(' ').trim();
        if (!search) return this.PLACEHOLDER;

        try {
            const res = await fetch(`${window.WanderTaleConfig.API_BASE_URL}/images/place?query=${encodeURIComponent(search)}`);
            const data = await res.json();
            return data.url || this.PLACEHOLDER;
        } catch {
            return this.PLACEHOLDER;
        }
    },

    loadPlaceImages(container) {
        const el = typeof container === 'string' ? document.querySelector(container) : container;
        if (!el) return;

        el.querySelectorAll('img[data-place-query]').forEach(async (img) => {
            const query = img.getAttribute('data-place-query');
            if (query) img.src = await this.getPlaceImageUrl(query);
        });
    }
};

window.ImagesAPI = ImagesAPI;
// WanderTale Trips API
class TripsAPI {
    // AI Plan Trip
    static async planTrip(data) {
        const res = await window.api.post('/api/ai/plan-trip', data);
        return res.success ? { success: true, ...res } : { success: false, message: res.message || 'Lỗi tạo kế hoạch' };
    }

    // CRUD Trips
    static getTrips() { return window.api.get('/api/trips'); }
    static getTrip(id) { return window.api.get(`/api/trips/${id}`); }
    static createTrip(data) { return window.api.post('/api/trips', data); }
    static updateTrip(id, data) { return window.api.put(`/api/trips/${id}`, data); }
    static deleteTrip(id) { return window.api.delete(`/api/trips/${id}`); }

    // Sharing
    static shareTrip(tripId, { email, role }) {
        return window.api.post(`/api/trips/${tripId}/share`, { email, role });
    }

    static removeCollaborator(tripId, userId) {
        return window.api.delete(`/api/trips/${tripId}/share/${userId}`);
    }
}

window.TripsAPI = TripsAPI;
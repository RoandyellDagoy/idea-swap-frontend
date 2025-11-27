const API_URL = "http://localhost:5000";

export const StatsService = {
    getStats: async () => {
        try {
            const res = await fetch(`${API_URL}/stats`);
            const json = await res.json();
            return json.data || { totalUsers: 0, totalIdeas: 0};
        } catch (error) {
            console.error("Error fetching stats:", error);
            return { totalUsers: 0, totalIdeas: 0};
        }
    }
};

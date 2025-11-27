const API_URL = import.meta.env.BASE_URL;

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

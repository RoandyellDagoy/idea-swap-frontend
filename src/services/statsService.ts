const API_URL = import.meta.env.VITE_BASE_URL;

export const StatsService = {
    getStats: async () => {
        console.time("getStats execution time");
        try {
            const res = await fetch(`${API_URL}/stats`);
            const json = await res.json();
            console.timeEnd("getStats execution time");
            return json.data || { totalUsers: 0, totalIdeas: 0};
        } catch (error) {
            console.error("Error fetching stats:", error);
            console.timeEnd("getStats execution time");
            return { totalUsers: 0, totalIdeas: 0};
        }
    }
};

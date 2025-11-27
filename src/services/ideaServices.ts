import type { Idea } from "../types/Idea";

const API_URL = "http://localhost:5000/ideas";

export const IdeaService ={
    getAll : async (): Promise<Idea[]> =>{
        const res = await fetch(API_URL);
        const json = await res.json();
        return json.data ?? [];
    },
    create : async (idea: Idea): Promise<Idea> => {
        const res = await fetch(API_URL + "/create", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(idea),
        });

        const json = await res.json();
        return json.data;
    },

    update : async (id: string, updates : Partial<Idea>): Promise<Idea> =>{
        const res = await fetch(`${API_URL}/${id}`,{
            method: "PUT",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(updates),
        })

        const json = await res.json();
        return json.data;
    },

    remove : async (id: string): Promise<void> => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE" 
        })
        if (!res.ok) throw new Error('Failed to delete idea');
    },
}
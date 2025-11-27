import type { Idea } from "../types/Idea";

const API_URL = import.meta.env.VITE_BASE_URL;

export const IdeaService ={
    getAll : async (signal?: AbortSignal): Promise<Idea[]> =>{
        const res = await fetch(API_URL + "/ideas", { signal });
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
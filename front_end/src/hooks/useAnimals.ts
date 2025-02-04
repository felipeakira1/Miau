import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export interface Animal {
    id: number;
    name: string;
    species: string;
    breed: string;
    birthDate: Date;
    weight: number;
    imageUrl?: string;
    owner: {
        userId: number;
        user: {
            name: string;
        }
        imageUrl: string;
    }
}

export function useAnimals() {
    return useQuery({
        queryKey: ["animals"],
        queryFn: async() => {
            const response = await api.get("/animals");
            return response.data.animals;
        },
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,

    })
}
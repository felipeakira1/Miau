import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export interface Owner {
    id: number;
    userId: number;
    imageUrl: string;
    user: {
        id: number;
        name: string;
        email: string;
        phone: string;
    }
}

export function useOwners() {
    return useQuery({
        queryKey: ["owners"],
        queryFn: async() => {
            const response = await api.get("/owners");
            return response.data.owners;
        },
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,

    })
}
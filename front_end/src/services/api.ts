import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useApi() {
    const API_BASE_URL = "http://localhost:3333";
    const { jwt, refreshJwt, logout } = useContext(AuthContext);

    async function fetchWithAuth(endpoint : string, options: RequestInit = {}) {
        let token = jwt;
        let response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`
            }
        })

        if(response.status === 401 && token) {
            console.warn("Token expirado")
            token = await refreshJwt();
            if(!token) {
                logout();
            }
            response = await fetch(`${API_BASE_URL}${endpoint}`, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${token}`
                }
            })
        } else if (response.status === 401) {
            console.error("Erro na autenticação");
            logout();
        }
        return response;
    }

    return fetchWithAuth
}
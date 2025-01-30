import { createContext, ReactNode, useState } from "react"

interface AuthContextType {
    jwt: string,
    user: {
        sub: number,
        role: string,
    }
    refreshJwt: () => Promise<string>;
    logout: () => void;
    isAuthenticated: boolean,
    login: ({jwt, sub, role} : SaveUserData) => void;
};

interface SaveUserData {
    jwt: string,
    sub: number,
    role: string,
}
export const AuthContext = createContext({} as AuthContextType);


interface AuthContextProviderProps {
    children: ReactNode;
}

export function AuthContextProvider({children} : AuthContextProviderProps) {
    const [jwt, setJwt] = useState(()=>localStorage.getItem("jwt") || '')
    const [userSub, setUserSub] = useState(Number(localStorage.getItem("userSub")) || 0);
    const [userRole, setUserRole] = useState(() => localStorage.getItem("userRole") || '');

    const isAuthenticated = !!jwt;

    function login({jwt, sub, role} : SaveUserData) {
        setJwt(jwt)
        setUserSub(sub)
        setUserRole(role)
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("userSub", String(sub));
        localStorage.setItem("userRole", role);
    }

    async function refreshJwt() {
        try {
            const response = await fetch("http://localhost:3333/token/refresh", {
                method: "PATCH",
                credentials: "include"
            })

            if(!response.ok) throw new Error("Erro ao renovar token")

            const data = await response.json();
            setJwt(data.token);
            localStorage.setItem("jwt", data.token);
            return data.token
        } catch(err) {
            console.error("Erro ao renovar token:", err);
            logout();
        }
    }

    function logout() {
        setJwt('');
        setUserSub(0);
        setUserRole('');
        localStorage.removeItem("jwt");
        localStorage.removeItem("userSub");
        localStorage.removeItem("userRole");
    }

    return (
        <AuthContext.Provider value={{
            jwt,
            user: {
                sub: userSub,
                role: userRole
            },
            refreshJwt,
            logout,
            isAuthenticated,
            login
        }}>
        {children}
        </AuthContext.Provider>
    )
}
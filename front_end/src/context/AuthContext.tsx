import { createContext, ReactNode, useState } from "react"

interface AuthContextType {
    jwt: string,
    user: {
        sub: number,
        role: string,
    }
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
    const [jwt, setJwt] = useState('')
    const [userSub, setUserSub] = useState(0);
    const [userRole, setUserRole] = useState('');

    function login({jwt, sub, role} : SaveUserData) {
        setJwt(jwt)
        setUserSub(sub)
        setUserRole(role)
        console.log('sucesso!')
    }

    return (
        <AuthContext.Provider value={{
            jwt,
            user: {
                sub: userSub,
                role: userRole
            },
            login
        }}>
        {children}
        </AuthContext.Provider>
    )
}
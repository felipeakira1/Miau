import { LoginContainer } from "./styles";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";


import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { JwtPayload } from "../../@types/jwt";


export interface LoginData {
    email: string,
    password: string,
}

export function Login() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { login } = useContext(AuthContext)
    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm<LoginData>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    async function handleLogin(data : LoginData) {
        setLoading(true)
        setError('')

        const { email, password } = data
        const response = await fetch("http://localhost:3333/authenticate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, password})
        })

        setLoading(false)
        if (!response.ok) {
            setError('Credenciais inválidas!')
            // throw new Error("Credenciais inválidas");
        }

        const { token } = await response.json()
        const decodedToken : JwtPayload = jwtDecode(token)
        const { sub, role } = decodedToken
        const userId = typeof sub === 'string' ? parseInt(sub) : sub;
        if (typeof userId !== 'number' || isNaN(userId)) 
            throw new Error("Invalid token: sub is not a valid number");
        login ({jwt: token, sub: userId, role})
        navigate('/home')
        reset()
    };

    return (
        <LoginContainer>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(handleLogin)} action="">
                {error ? <p>{error}</p> : <></>}
                <label htmlFor="email">E-mail</label>
                <input 
                    type="text" 
                    id="email"
                    required
                    placeholder="E-mail"
                    {...register("email")}
                />
                
                <label htmlFor="password">Senha</label>
                <input 
                    type="password" 
                    id="password"
                    placeholder="Senha"
                    required
                    {...register("password")}
                />
                <a href="">Esqueceu a senha?</a>
                {loading ? <p>Carregando...</p> : <></>}
                <button type="submit">Entrar</button>
                <a href="">Não possui uma conta? Registre-se</a>
            </form>
        </LoginContainer>
    )
}
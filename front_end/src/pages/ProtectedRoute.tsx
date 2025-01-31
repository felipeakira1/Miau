import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
    const { jwt } = useContext(AuthContext)
    console.log(jwt)
    return jwt ? <Outlet/> : <Navigate to="/login" replace/>
}
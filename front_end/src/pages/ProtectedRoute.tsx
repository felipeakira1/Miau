import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
    const { isAuthenticated } = useContext(AuthContext)
    return isAuthenticated ? <Outlet/> : <Navigate to="/"/>
}
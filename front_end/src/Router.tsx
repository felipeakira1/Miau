

import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Profile } from './pages/Profile';
import { ProtectedRoute } from './pages/ProtectedRoute';

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/" element={<DefaultLayout/>}>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </Route>
            </Route>
        </Routes>
    )
}
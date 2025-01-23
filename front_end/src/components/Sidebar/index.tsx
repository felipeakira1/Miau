import { NavLink } from "react-router-dom";
import { NavLinkContent, SidebarContainer } from "./styles";
import { Person, Door } from "phosphor-react";

export function Sidebar() {
    return (
        <SidebarContainer>
            <h1>Miau</h1>
            <nav>
                <NavLink to="/profile" title="Perfil">
                    <NavLinkContent>
                        <Person size={24}/>
                        Perfil
                    </NavLinkContent>
                </NavLink>
            </nav>
            <NavLink to="/logout" title="Logout">
                <NavLinkContent>
                    <Door size={24}/>
                    Sair
                </NavLinkContent>
            </NavLink>
        </SidebarContainer>
    )
}
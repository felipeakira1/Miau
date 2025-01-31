import { NavLink } from "react-router-dom";
import { BackButton, NavLinkContent, SidebarContainer, SidebarHeader } from "./styles";
import { Person, UserCircle, Door, CaretDoubleRight, CaretDoubleLeft, Dog } from "phosphor-react";

interface SidebarProps {
    toggleSidebar: () => void;
    isExpanded: boolean;
}

export function Sidebar({ toggleSidebar, isExpanded} : SidebarProps) {
    return (
        <SidebarContainer isExpanded={isExpanded}>
            <SidebarHeader isExpanded={isExpanded}>
                {isExpanded && <h1>Miau</h1>}

                <BackButton onClick={toggleSidebar}>
                    {isExpanded ? <CaretDoubleLeft size={34}/> : <CaretDoubleRight size={34}/>}
                </BackButton>
            </SidebarHeader>
            <nav>
                <NavLink to="/profile" title="Perfil">
                    <NavLinkContent>
                        <UserCircle size={30}/>
                        {isExpanded && "Perfil"}
                    </NavLinkContent>
                </NavLink>
                <NavLink to="/owners" title="Tutores">
                    <NavLinkContent>
                        <Person size={30}/>
                        {isExpanded && "Tutores"}
                    </NavLinkContent>
                </NavLink>
                <NavLink to="/animals" title="Animais">
                    <NavLinkContent>
                        <Dog size={30}/>
                        {isExpanded && "Animais"}
                    </NavLinkContent>
                </NavLink>
            </nav>
            <NavLink to="/logout" title="Logout">
                <NavLinkContent>
                    <Door size={24}/>
                    {isExpanded && "Sair"}
                </NavLinkContent>
            </NavLink>
        </SidebarContainer>
    )
}
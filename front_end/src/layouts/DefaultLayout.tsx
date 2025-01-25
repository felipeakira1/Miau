import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { LayoutContainer } from "./styles";
import { useState } from "react";

export function DefaultLayout() {
    const [ isExpanded, setIsExpanded ] = useState(false);

    function toggleSidebar() {
        setIsExpanded(!isExpanded)
    }

    return (
        <LayoutContainer isExpanded={isExpanded}>
            <Sidebar toggleSidebar={toggleSidebar} isExpanded={isExpanded}/>
            <Outlet/>
        </LayoutContainer>
    )
}
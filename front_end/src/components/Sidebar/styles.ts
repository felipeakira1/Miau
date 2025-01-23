import styled from "styled-components";

export const SidebarContainer = styled.div`
    background-color: ${props => props.theme['green-300']};
    width: 200px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h1 {
        color: white;
        padding: 20px 24px;
    }
    
    a {
        text-decoration: none;
        color: white;
        display: flex;
        padding: 20px 24px;

        &:hover {
            background-color: ${props => props.theme['green-500']};
        }
    }
    
`

export const NavLinkContent = styled.nav`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 14px;
`
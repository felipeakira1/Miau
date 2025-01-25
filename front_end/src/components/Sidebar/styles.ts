import styled from "styled-components";

interface SidebarContainerProps {
    isExpanded: boolean;
}

export const SidebarContainer = styled.div<SidebarContainerProps>`
    background-color: white;
    width: ${props => props.isExpanded ? "200px" : "80px"};
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: width 0.2s ease-in-out;
    border-right: 2px solid ${props => props.theme['gray-300']};
    padding: 8px;
    
    h1 {
        color: ${props => props.theme['gray-700']};
        ${props => props.isExpanded ? "200px" : "80px"};
        transition: opacity 0.3s ease-in-out;
        opacity: ${(props) => (props.isExpanded ? "1" : "0")};
        pointer-events: ${(props) => (props.isExpanded ? "auto" : "none")};
    }

    a {
        text-decoration: none;
        color: ${props => props.theme['gray-500']};
        display: flex;
        padding: 10px 14px;
        border-radius: 6px;
        font-size: 1.1rem;
        transition: color 0.2s ease-in-out;
        transition: background-color 0.2s ease-in-out;

        &:hover {
            color: ${props => props.theme['white']};
            background-color: ${props => props.theme['gray-500']};

            svg {
                color: ${props => props.theme['white']};
            }
        }
    }

    svg {
        color: ${props => props.theme['gray-500']};
    }
    
`

export const NavLinkContent = styled.nav`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 14px;
`

export const BackButton = styled.button`
    background-color: inherit;
    border: 0;
    cursor: pointer;
`

export const SidebarHeader = styled.div<SidebarContainerProps>`
    margin-top: 16px;
    display: flex;
    justify-content: ${props => (props.isExpanded ? "space-around" : "center")};
    align-items: end;
    svg {
        color: ${props => props.theme['gray-700']};    
    }
`
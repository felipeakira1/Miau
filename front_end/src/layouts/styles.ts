import styled from "styled-components";

interface LayoutContainerProps {
    isExpanded: boolean;
}

export const LayoutContainer = styled.div<LayoutContainerProps>`
    background-color: ${props => props.theme['white']};
    background-color: ${props => props.theme['white-300']};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: ${props => (props.isExpanded ? "calc(100vw - 200px)" : "calc(100vw - 80px)")};
    margin-left: ${props => (props.isExpanded ? "200px" : "80px")};
    padding: 24px 36px;
`
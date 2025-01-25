import styled from "styled-components";

export type ButtonVariant = "green" | "gray" | "red";
export type ButtonSize = "big" | "small";

interface ButtonContainerProps {
    variant: ButtonVariant;
    size: ButtonSize;
}

const buttonSizes = {
    "big": "100%",
    "small": "140px"
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    background-color: ${props => props.theme['green-500']};
    padding: 10px 20px;
    min-width: 1;
    height: 46px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 0;
    color: white;
    width: ${props => buttonSizes[props.size]};

    &:not(:disabled):hover {
        background-color: ${props => props.theme['green-700']};
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`
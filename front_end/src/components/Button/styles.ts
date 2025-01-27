import styled from "styled-components";

export type ButtonVariant = "green" | "gray" | "red" | "yellow";
export type ButtonSize = "big" | "small" | "auto";

interface ButtonContainerProps {
    variant: ButtonVariant;
    size: ButtonSize;
}

const backgroundColors = {
    green: (theme: any) => theme['green-500'],
    gray: (theme: any) => theme['gray-500'],
    red: (theme: any) => theme['red-500'],
    yellow: (theme: any) => theme['yellow-500']
}

const hoverBackgroundColors = {
    green: (theme: any) => theme['green-700'],
    gray: (theme: any) => theme['gray-700'],
    red: (theme: any) => theme['red-700'],
    yellow: (theme: any) => theme['yellow-700'],
}

const buttonSizes = {
    "big": "100%",
    "small": "140px",
    "auto": "auto"
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    background-color: ${props => backgroundColors[props.variant](props.theme)};
    padding: 10px 20px;
    min-width: 1;
    height: 46px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 23px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 0;
    color: white;
    width: ${props => buttonSizes[props.size]};

    &:not(:disabled):hover {
        background-color: ${props => hoverBackgroundColors[props.variant](props.theme)};
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`
import { styled } from "styled-components";

export const LoginContainer = styled.div`
    margin: 10rem auto;
    max-width: 30rem;
    height: calc(100vh - 20rem);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${props => props.theme['white-background']};
    padding: 60px;
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
    }

    input {
        padding: 10px 16px;
        border: 1px solid transparent;
        border-radius: 5px;

        &:hover {
            border: 1px solid ${props => props.theme['green-500']}
        }

        &:focus {
            outline: none;
            border: 1px solid ${props => props.theme['green-500']}
        }
    }

    a {
        text-decoration: none;
        color: ${props => props.theme['gray-500']}
    }

    button {
        background-color: ${props => props.theme['green-500']};
        border: none;
        color: white;
        padding: 10px;
        border-radius: 8px;
        font-weight: 700;
        font-size: 1.2rem;
        cursor: pointer;
    }
`
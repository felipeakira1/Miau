import styled from "styled-components";

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;

    label {
        font-weight: 700;
    }

    input {

        padding: 10px 16px;
        border: 1px solid transparent;
        border-radius: 5px;
        background-color: #F0F0F0;
        &:hover {
        border: 1px solid ${props => props.theme['green-500']}
        }

        &:focus {
            outline: none;
            border: 1px solid ${props => props.theme['green-500']}
        }
    }
`
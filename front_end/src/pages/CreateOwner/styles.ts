import styled from "styled-components";

export const CreateOwnerContainer = styled.div`
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    .closeButton {
        background-color: transparent;
        border: 0;
        cursor: pointer;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    .submitRow {
        display: flex;
        justify-content: end;
    }

    .flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
        &:last-child {
            cursor: pointer;
        }
    }
`

export const CreateOwnerContent = styled.div`
    background-color: white;
    width: 34rem;
    padding: 24px 48px;
    border-radius: 14px;
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.2);
`

export const ProfileImage = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    
    img {
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
    }

    button {
        height: 48px;
        border-radius: 24px;
        padding: 12px 24px;
        border: 0;
        cursor: pointer;

        &:hover {
            background-color: ${props => props.theme['gray-300']};
        }
    }
`

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 32px;
`

export const UpdatePasswordRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;

    label {
        font-weight: 700;
    }
`
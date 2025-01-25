import styled from "styled-components";

export const CreateOwnerContainer = styled.div`
    height: calc(100vh - 10rem);
    margin: 0 5rem;
    width: 34rem;
    border-radius: 14px;
    background-color: white;
    padding: 24px 48px;
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;
    gap: 24px;

    form {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    .submitRow {
        display: flex;
        justify-content: end;
    }
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
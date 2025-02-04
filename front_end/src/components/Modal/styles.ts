import { styled } from "styled-components";

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const ModalContainer = styled.div`
    background: white;
    padding: 24px 48px;
    border-radius: 8px;
    min-width: 400px;
    max-width: 600px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 20px;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    
    form {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
`;


export const UpdateImage = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;

    img {
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        object-fit: cover;
    }
`
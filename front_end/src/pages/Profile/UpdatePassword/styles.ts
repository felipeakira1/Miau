import styled from "styled-components";


export const UpdatePasswordContainer = styled.div`
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
    
`

export const UpdatePasswordHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const UpdatePasswordContent = styled.div`
    background-color: white;
    padding: 24px;
    border-radius: 8px;
    width: 400px;
    position: relative;
    box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 16px;
`
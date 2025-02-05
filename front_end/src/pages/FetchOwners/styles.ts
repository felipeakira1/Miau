import { styled } from "styled-components";

export const NewOwnerButton = styled.button`
  border: 2px dotted gray;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  top: 24px;
  width: 80%;
  position: fixed;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 20px;
`;
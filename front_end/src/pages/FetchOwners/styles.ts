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

export const FetchOwnersContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;

  .flex {
    display: flex;
    gap: 8px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: ${props => props.theme['gray-300']};
    color: ${props => props.theme['gray-700']};
  }

  tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 20px;
`;
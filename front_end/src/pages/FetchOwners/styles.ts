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
    background-color: #4CAF50;
    color: white;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 20px;
`;
import { ToastContainer } from "react-toastify";
import { styled } from "styled-components";

interface TableProps<T> {
    columns: string[];
    data: T[];
    renderRow: (item : T) => JSX.Element;
}

export function Table<T>({columns, data, renderRow } : TableProps<T>) {
    return (
        <>
            {data.length > 0 ? (
                <TableContainer>
                    <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
                    <thead>
                        <tr>
                            {columns.map((col: string, index: number) => (
                                <th key={index}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(renderRow)}
                    </tbody>
                </TableContainer>
            ) : (
                <p>Nenhum dado encontrado.</p>
            )}
        </>
    )
}

export const TableContainer = styled.table`
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
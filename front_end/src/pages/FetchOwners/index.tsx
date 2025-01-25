import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ErrorMessage, FetchOwnersContainer, NewOwnerButton, Table } from "./styles";
import { FilePlus } from "phosphor-react"

export function FetchOwners () {
    const { jwt } = useContext(AuthContext);
    interface Owner {
        id: number;
        user: {
            id: number;
            name: string;
            email: string;
            phone: string;
        }
    }

    const [owners, setOwners] = useState<Owner[]>([]);
    const [error, setError] = useState(null);

    useEffect(()=> {
        async function fetchOwners() {
            try {
              const response = await fetch("http://localhost:3333/owners", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${jwt}`,
                },
              });
      
              if (!response.ok) {
                throw new Error("Erro ao buscar os dados dos owners");
              }
      
              const { owners } = await response.json();
              console.log(owners)
              setOwners(owners);
            } catch (err) {
                console.log(err)
            }
          }
      
          fetchOwners();
    }, [])

    return (
        <>
        <NewOwnerButton>
            <FilePlus size={24}/>
            NOVO TUTOR
        </NewOwnerButton>
        <FetchOwnersContainer>
            <h1>Lista de Owners</h1>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {owners.length > 0 ? (
                <Table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {owners.map((owner) => (
                    <tr key={owner.id}>
                        <td>{owner.user.id}</td>
                        <td>{owner.user.name}</td>
                        <td>{owner.user.email}</td>
                        <td>{owner.user.phone}</td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            ) : (
                <p>Nenhum owner encontrado.</p>
            )}
        </FetchOwnersContainer>
        </>
    )
}
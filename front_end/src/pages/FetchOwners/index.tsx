import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ErrorMessage, FetchOwnersContainer, Table } from "./styles";
import { Button } from "../../components/Button";

export function FetchOwners () {
    const { jwt } = useContext(AuthContext);
    interface Owner {
        id: number;
        imageUrl: string;
        user: {
            id: number;
            name: string;
            email: string;
            phone: string;
        }
    }

    const [owners, setOwners] = useState<Owner[]>([]);

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
        <FetchOwnersContainer>
            <h1>Tutores</h1>
            <div>
                <Button variant="green" size="auto">Registrar tutor</Button>
            </div>
            {owners.length > 0 ? (
                <Table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Tutor</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {owners.map((owner) => (
                    <tr key={owner.id}>
                        <td>{owner.user.id}</td>
                        <td><img src={owner.imageUrl} alt="" /></td>
                        <td>{owner.user.name}</td>
                        <td>{owner.user.email}</td>
                        <td>{owner.user.phone}</td>
                        <td >
                            <div className="flex">
                                    <Button size="auto" variant="red">Excluir</Button>
                                    <Button size="auto" variant="yellow">Alterar</Button>
                            </div>
                        </td>
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
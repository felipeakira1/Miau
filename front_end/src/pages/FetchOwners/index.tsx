import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FetchOwnersContainer, Table } from "./styles";
import { Button } from "../../components/Button";
import { toast, ToastContainer } from 'react-toastify';
import { CreateOwner } from "../CreateOwner";

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
    const [ isCreateOwnerFormOpen, setIsCreateOwnerFormOpen ] = useState(false);

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

    function handleDeleteOwner() {
    }
    
    return (
        <FetchOwnersContainer>
            <ToastContainer 
                position="top-right" 
                autoClose={5000} // Tempo de auto fechamento (5 segundos)
                hideProgressBar={false} 
                newestOnTop={false} 
                closeOnClick 
                rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover
            />
            <CreateOwner 
                isOpen={isCreateOwnerFormOpen} 
                onClose={() => setIsCreateOwnerFormOpen(false)} 
                onComplete={() => 
                    toast.success('Usuario foi adicionado com sucesso!', {
                        autoClose: 3000,
                        progress: undefined
                    })}
            />
            <h1>Tutores</h1>
            <div>
                <Button variant="green" size="auto" type="button" onClick={() => setIsCreateOwnerFormOpen(true)}>Registrar tutor</Button>
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
                                    <Button onClick={handleDeleteOwner} size="auto" variant="red">Excluir</Button>
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
    )
}
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "../../components/Button";
import { toast, ToastContainer } from 'react-toastify';
import { CreateOwner } from "../CreateOwner";
import { FetchOwnersContainer, Table } from "../FetchOwners/styles";

interface Animal {
    id: number;
    name: string;
    species: string;
    breed: string;
    birthDate: Date;
    weight: number;
    imageUrl?: string;
    ownerId: number;
}

const fetchAnimals = async () => {
    
}

export function FetchAnimals () {
    const { jwt } = useContext(AuthContext);

    const [animals, setAnimals] = useState<Animal[]>([]);
    const [ isCreateOwnerFormOpen, setIsCreateOwnerFormOpen ] = useState(false);

    useEffect(()=> {
        async function fetchAnimals() {
            try {
              const response = await fetch("http://localhost:3333/animals", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${jwt}`,
                },
              });
      
              if (!response.ok) {
                throw new Error("Erro ao buscar os dados dos animais");
              }
      
              const { animals } = await response.json();
              setAnimals(animals);
            } catch (err) {
                console.log(err)
            }
          }
      
          fetchAnimals();
    }, [])
    
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
            <h1>Animais</h1>
            <div>
                <Button variant="green" size="auto" type="button" onClick={() => setIsCreateOwnerFormOpen(true)}>Registrar animal</Button>
            </div>
            {animals.length > 0 ? (
                <Table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Animal</th>
                    <th>Nome</th>
                    <th>Espécie</th>
                    <th>Raça</th>
                    <th>Tutor</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {animals.map((animal) => (
                    // <tr key={animal.id}>
                    //     <td>{animal.user.id}</td>
                    //     <td><img src={animal.imageUrl} alt="" /></td>
                    //     <td>{animal.user.name}</td>
                    //     <td>{animal.user.email}</td>
                    //     <td>{animal.user.phone}</td>
                    //     <td >
                    //         <div className="flex">
                    //                 <Button onClick={handleDeleteOwner} size="auto" variant="red">Excluir</Button>
                    //                 <Button size="auto" variant="yellow">Alterar</Button>
                    //         </div>
                    //     </td>
                    // </tr>
                    ))} */}
                </tbody>
                </Table>
            ) : (
                <p>Nenhum owner encontrado.</p>
            )}
        </FetchOwnersContainer>
    )
}
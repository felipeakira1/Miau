import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "../../components/Button";
import { toast, ToastContainer } from 'react-toastify';
import { CreateOwner } from "../CreateOwner";
import { FetchOwnersContainer, Table } from "../FetchOwners/styles";
import { api } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import { CreateAnimal } from "./CreateAnimal";

interface Animal {
    id: number;
    name: string;
    species: string;
    breed: string;
    birthDate: Date;
    weight: number;
    imageUrl?: string;
    owner: {
        userId: number;
        user: {
            name: string;
        }
        imageUrl: string;
    }
}

const fetchAnimals = async () => {
    const response = await api.get('/animals');
    return response.data.animals;
}

export function FetchAnimals () {
    const { data : animals = [], isLoading, isError} = useQuery({
        queryKey: ["animals"],
        queryFn: fetchAnimals,
        staleTime: 1000 * 60 * 5
    })

    const [ isCreateAnimalFormOpen, setIsCreateAnimalFormOpen ] = useState(false);
    
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
            <CreateAnimal 
                isOpen={isCreateAnimalFormOpen} 
                onClose={() => setIsCreateAnimalFormOpen(false)} 
                onComplete={() => 
                    toast.success('Animal foi adicionado com sucesso!', {
                        autoClose: 3000,
                        progress: undefined
                    })}
            />
            <h1>Animais</h1>
            <div>
                <Button variant="green" size="auto" type="button" onClick={() => setIsCreateAnimalFormOpen(true)}>Registrar animal</Button>
            </div>
            {/* Se ainda estiver carregando */}
            {isLoading && <p>Carregando...</p>}

            {/* Se houver erro */}
            {isError && <p>Erro ao carregar os animais.</p>}
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
                    {animals.map((animal: Animal) => (
                        <tr key={animal.id}>
                        <td>{animal.id}</td>
                        <td><img src={animal.imageUrl} alt="" width="50" /></td>
                        <td>{animal.name}</td>
                        <td>{animal.species}</td>
                        <td>{animal.breed}</td>
                        <td><img src={animal.owner.imageUrl} width="50"/><span>{animal.owner.imageUrl}</span></td>
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
import { useState } from "react";
import { Button } from "../../components/Button";
import { toast, ToastContainer } from 'react-toastify';
import { Animal, useAnimals } from "../../hooks/useAnimals";
import { EditAnimal } from "./EditAnimal";
import { Table } from "./styles";
import { getBreedLabel, getSpeciesLabel } from "../../utils/animalOptions";
import { PageContainer } from "../../components/PageContainer";
import { CreateAnimal } from "./CreateAnimal";

function handleDeleteAnimal() {

}

export function FetchAnimals () {
    const { data : animals = [], isLoading, isError} = useAnimals()

    const [selectedAnimal, setSelectedAnimal] = useState<Animal | undefined>(undefined);
    const [ isCreateAnimalFormOpen, setIsCreateAnimalFormOpen ] = useState(false);
    const [ isEditAnimalFormOpen, setIsEditAnimalFormOpen ] = useState(false);
    
    return (
        <PageContainer>
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
            <EditAnimal
                isOpen={isEditAnimalFormOpen}
                onClose={() => setIsEditAnimalFormOpen(false)}
                onComplete={() => {
                    toast.success('Animal foi editado com sucesso!', {
                        autoClose: 3000,
                        progress: undefined,
                    })
                    setIsEditAnimalFormOpen(false);
                }}
                animal={selectedAnimal}
            />
            <h1>Animais</h1>
            <div>
                <Button variant="green" size="auto" type="button" onClick={() => setIsCreateAnimalFormOpen(true)}>Registrar animal</Button>
            </div>
            {isLoading && <p>Carregando...</p>}

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
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {animals.map((animal: Animal) => (
                        <tr key={animal.id}>
                        <td>{animal.id}</td>
                        <td><img src={animal.imageUrl} alt="" width="50" /></td>
                        <td>{animal.name}</td>
                        <td>{getSpeciesLabel(animal.species)}</td>
                        <td>{getBreedLabel(animal.species, animal.breed)}</td>
                        <td><img src={animal.owner.imageUrl} width="50"/></td>
                        <td >
                            <div className="flex">
                                <Button onClick={() => {setIsEditAnimalFormOpen(true); setSelectedAnimal(animal) }} size="auto" variant="yellow">Editar</Button>
                                <Button onClick={handleDeleteAnimal} size="auto" variant="red">Excluir</Button>
                            </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
                </Table>
            ) : (
                <p>Nenhum owner encontrado.</p>
            )}
        </PageContainer>
    )
}
import { useState } from "react";
import { Button } from "../../components/Button";
import { toast } from 'react-toastify';
import { CreateOwner } from "../CreateOwner";
import { Owner, useOwners } from "../../hooks/useOwners";
import { PageContainer } from "../../components/PageContainer";
import { Table } from "../../components/Table";
import { EditOwner } from "./EditOwner";



export function FetchOwners () {
    const { data : owners = [] } = useOwners()
    const [ isCreateOwnerFormOpen, setIsCreateOwnerFormOpen ] = useState(false);
    const [ isEditOwnerFormOpen, setIsEditOwnerFormOpen ] = useState(false);
    const [selectedOwner, setSelectedOwner] = useState<Owner | undefined>(undefined);
    function handleDeleteOwner() {
    }
    
    return (
        <PageContainer>
            <CreateOwner 
                isOpen={isCreateOwnerFormOpen} 
                onClose={() => setIsCreateOwnerFormOpen(false)} 
                onComplete={() => 
                    toast.success('Usuario foi adicionado com sucesso!', {
                        autoClose: 3000,
                        progress: undefined
                })}
            />
            <EditOwner
                isOpen={isEditOwnerFormOpen} 
                onClose={() => setIsEditOwnerFormOpen(false)} 
                onComplete={() => {
                }}
                owner={selectedOwner}
            />
            <h1>Tutores</h1>
            <div>
                <Button variant="green" size="auto" type="button" onClick={() => setIsCreateOwnerFormOpen(true)}>Registrar tutor</Button>
            </div>
            <Table
                columns={["ID", "Imagem", "Nome", "Email", "Telefone", "Ações"]}
                data={owners}
                renderRow={(owner: Owner) => (
                    <tr key={owner.id}>
                        <td>{owner.user.id}</td>
                        <td><img src={owner.imageUrl} alt="" /></td>
                        <td>{owner.user.name}</td>
                        <td>{owner.user.email}</td>
                        <td>{owner.user.phone}</td>
                        <td >
                            <div className="flex">
                                    <Button onClick={() => { setIsEditOwnerFormOpen(true); setSelectedOwner(owner) }} size="auto" variant="yellow">Editar</Button>
                                    <Button onClick={handleDeleteOwner} size="auto" variant="red">Excluir</Button>
                            </div>
                        </td>
                    </tr>
                )}
            />
        </PageContainer>
    )
}
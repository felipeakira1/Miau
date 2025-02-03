import { useForm } from "react-hook-form";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "phosphor-react"
import { CreateOwnerContainer, CreateOwnerContent } from "../../CreateOwner/styles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../services/api";
import { Dropdown } from "../../../components/Dropdown";
import { CustomDatePicker } from "../../../components/DatePicker";
import { AutoComplete } from "../../../components/AutoComplete";
import { Owner, useOwners } from "../../../hooks/useOwners";

const speciesOptions = [
    { value: "dog", label: "Cachorro" },
    { value: "cat", label: "Gato" },
    { value: "bird", label: "Pássaro" },
];

const breedOptions: { [key: string]: { value: string; label: string; }[] } = {
    dog: [
        { value: "labrador", label: "Labrador" },
        { value: "bulldog", label: "Bulldog" },
        { value: "poodle", label: "Poodle" },
    ],
    cat: [
        { value: "siamese", label: "Siamês" },
        { value: "persian", label: "Persa" },
        { value: "mainecoon", label: "Maine Coon" },
    ],
    bird: [
        { value: "parrot", label: "Papagaio" },
        { value: "canary", label: "Canário" },
        { value: "cockatiel", label: "Calopsita" },
    ],
};

const schema = z.object({
    name: z.string().nonempty("Nome obrigatório"),
    species: z.string().nonempty("Espécie obrigatória"),
    breed: z.string().nonempty("Raça obrigatória"),
    birthDate: z.date().nullable(),
    weight: z.string().transform((val) => parseFloat(val)),
    ownerId: z.number()
});
  
type FormData = z.infer<typeof schema>;

interface CreateAnimalProps {
    isOpen: boolean,
    onClose: () => void,
    onComplete: () => void, 
}

export function CreateAnimal({ isOpen, onClose, onComplete} : CreateAnimalProps) {
    if(!isOpen) return;

    const queryClient = useQueryClient();
    const { data : owners } = useOwners();
    
    const { control, register, handleSubmit, reset, watch, formState: { errors, isValid } } = useForm<FormData>({
        defaultValues: {
            name: "",
            species: "",
            breed: "",
            birthDate: undefined,
            weight: undefined,
            ownerId: undefined,
        },
        resolver: zodResolver(schema)
    });

    
    const handleCreateAnimal = useMutation({
        mutationFn: (data : FormData) => {
            const formattedData = {
                ...data,
                birthDate: data.birthDate ? new Date(data.birthDate).toISOString().split("T")[0] : null,
            }
            return api.post('/animals', formattedData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["animals"] });
            reset();
            onComplete();
        }
    })

    const selectedSpecies = watch("species");

    return (
        <CreateOwnerContainer>
            <CreateOwnerContent>
            <div className="flex">
                <h1>Registrar animal</h1>
                <X onClick={onClose} size={24 } style={{cursor:"pointer"}}></X>
            </div>
            <form onSubmit={handleSubmit((data) => handleCreateAnimal.mutate(data))} action="">
                    <Input label="Nome*" name="name" register={register} required/>
                    <AutoComplete 
                        label="Tutores*" 
                        name="ownerId" 
                        control={control} 
                        options={owners ? 
                            owners.map((owner : Owner) => ({
                                imageUrl: owner.imageUrl,
                                value: owner.userId,
                                label: owner.user.name,
                            }))
                            : []
                        }
                        error={errors.species?.message}
                    />
                    <Dropdown 
                        label="Espécie" 
                        name="species" 
                        control={control} 
                        options={speciesOptions} 
                        error={errors.species?.message}
                    />
                    <Dropdown 
                        label="Raça" 
                        name="breed" 
                        control={control} 
                        options={selectedSpecies ? breedOptions[selectedSpecies] || [] : []} 
                        error={errors.breed?.message}
                    />
                    <CustomDatePicker 
                        label="Data de Nascimento" 
                        name="birthDate" 
                        control={control} 
                        error={errors.birthDate?.message} 
                    />
                    <Input label="Peso" name="weight" register={register} type="number" step="0.1" required error={errors.weight?.message}/>
                    <div className="submitRow">
                        <Button type="submit" size="small" disabled={!isValid} >
                            Salvar
                        </Button>
                    </div>
            </form>
            </CreateOwnerContent>
        </CreateOwnerContainer>
    )
}
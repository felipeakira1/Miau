import { useForm } from "react-hook-form";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../services/api";
import { Dropdown } from "../../../components/Dropdown";
import { CustomDatePicker } from "../../../components/DatePicker";
import { AutoComplete } from "../../../components/AutoComplete";
import { Owner, useOwners } from "../../../hooks/useOwners";
import { Animal } from "../../../hooks/useAnimals";
import { Modal } from "../../../components/Modal";
import { ImagePicker } from "../../../components/ImagePicker";
import { useState } from "react";
import { useToast } from "../../../hooks/useToast";
import { breedOptions, speciesOptions } from "../../../utils/animalOptions";

const schema = z.object({
    name: z.string().nonempty("Nome obrigatório"),
    species: z.string().nonempty("Espécie obrigatória"),
    breed: z.string().nonempty("Raça obrigatória"),
    birthDate: z.preprocess(
        (val) => (val instanceof Date ? val.toISOString().split("T")[0] : val),
        z.string()
    ),
    weight: z.string(),
    ownerId: z.number()
});
  
type FormData = z.infer<typeof schema>;

interface EditAnimalProps {
    isOpen: boolean,
    onClose: () => void,
    onComplete: () => void, 
    animal?: Animal
}

export function EditAnimal({ isOpen, onClose, onComplete, animal } : EditAnimalProps) {
    if(!isOpen) return;

    const queryClient = useQueryClient();
    const { data : owners } = useOwners();
    const { success } = useToast();

    const [image, setImage] = useState(animal?.imageUrl || "");
    
    const { control, register, handleSubmit, watch, formState: { errors, isDirty } } = useForm<FormData>({
        defaultValues: {
            ...animal,
            weight: animal?.weight.toString(),
            birthDate: animal?.birthDate ? new Date(animal.birthDate).toISOString().split("T")[0] : ""
        },
        resolver: zodResolver(schema)
    });

    const selectedSpecies = watch("species");

    const updateAnimal = useMutation({
        mutationFn: (updatedAnimal: any) => {
            console.log(updateAnimal)
            const formattedData = {
                ...updatedAnimal,
                birthDate: updatedAnimal.birthDate ? new Date(updatedAnimal.birthDate).toISOString().split("T")[0] : null,
            }
            success("Animal atualizado com sucesso!");
            return api.put(`/animals/${animal!.id}`, formattedData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["animals"] });
            onComplete();
            onClose();
        },
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Editar animal">
            <form onSubmit={handleSubmit((data) => updateAnimal.mutate(data))} action="">
                <ImagePicker 
                    entityType="animals" 
                    entityId={animal?.id} 
                    imageUrl={image} 
                    onImageChange={(newImageUrl) => {
                        setImage(newImageUrl);
                        success("Imagem atualizada com sucesso!");
                        queryClient.invalidateQueries({ queryKey: ["animals"] });
                        onClose();
                        onComplete();
                    }}
                />
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
                    disabled={true}
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
                    <Button type="submit" size="small" disabled={!isDirty} >
                        Salvar
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
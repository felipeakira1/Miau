import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../services/api";
import { Owner } from "../../../hooks/useOwners";
import { Modal } from "../../../components/Modal";
import { ImagePicker } from "../../../components/ImagePicker";
import { useState } from "react";
import InputMask from "react-input-mask";
import { useToast } from "../../../hooks/useToast";

const schema = z.object({
    name: z.string().nonempty("Nome obrigatório"),
    email: z.string().email("Formato inválido").nonempty("Email obrigatório"),
    // cpf: z
    //   .string()
    //   .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato inválido")
    //   .nonempty("CPF obrigatório"),
    phone: z
      .string()
      .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Formato inválido")
      .optional(),
    address: z.string().optional(),
});
  
type FormData = z.infer<typeof schema>;

interface EditOwnerProps {
    isOpen: boolean,
    onClose: () => void,
    onComplete: () => void, 
    owner?: Owner
}

export function EditOwner({ isOpen, onClose, onComplete, owner } : EditOwnerProps) {
    if(!isOpen) return;

    const queryClient = useQueryClient();
    const { success, error } = useToast();

    const [image, setImage] = useState(owner?.imageUrl || "");
    
    const { control, register, handleSubmit, formState: { errors, isDirty } } = useForm<FormData>({
        defaultValues: owner ? {
            name: owner.user.name,
            email: owner.user.email,
            // cpf: owner.user.cpf,
            phone: owner.user.phone,
            address: owner.user.address,
        } : undefined,
        resolver: zodResolver(schema)
    });

    const updateOwner = useMutation({
        mutationFn: async (updateOwner: any) => {
            const response = await api.put(`/owners/${owner!.user.id}`, updateOwner)
            console.log(response);
            if(response.status !== 204) {
                error("Erro ao atualizar tutor")
            }
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["owners"] });
            success("Tutor atualizado com sucesso!");
            onComplete();
            onClose();
        },
    });
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Editar tutor">
            <form onSubmit={handleSubmit((data) => updateOwner.mutate(data))} action="">
                <ImagePicker 
                    entityType="owners" 
                    entityId={owner?.user.id} 
                    imageUrl={image} 
                    onImageChange={(newImageUrl) => {
                        setImage(newImageUrl);
                        success("Imagem atualizada com sucesso!");
                        queryClient.invalidateQueries({ queryKey: ["owners"] });
                    }}
                />
                <Input label="Nome*" name="name" register={register} required/>
                <Input label="E-mail*" name="email" register={register} error={errors.email?.message} required/>            
                {/* <Controller
                    name="cpf"
                    control={control}
                    defaultValue=""
                    render={({field}) => (
                        <InputMask 
                            mask="999.999.999-99"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}>
                            {(inputProps) => (
                                <Input 
                                    label="CPF*" 
                                    name="cpf" 
                                    register={register} 
                                    error={errors.cpf?.message}  
                                    {...inputProps}
                                    inputRef={field.ref}
                                />
                            )}
                        </InputMask>        
                    )}
                /> */}
                <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    render={({field}) => (
                        <InputMask 
                        mask="(99) 99999-9999" 
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}>
                            {(inputProps) => (
                                <Input 
                                    label="Telefone (opcional)" 
                                    name="phone" 
                                    required 
                                    error={errors.phone?.message} 
                                    {...inputProps}
                                    inputRef={field.ref}
                                />
                            )}
                        </InputMask>        
                    )}
                />    
                <Input label="Endereço (opcional)" name="address" register={register}/>
                <div className="submitRow">
                    <Button type="submit" size="small" disabled={!isDirty} >
                        Salvar
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
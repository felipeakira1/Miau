import { Controller, useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { CreateOwnerContainer, CreateOwnerContent } from "./styles";
import { Button } from "../../components/Button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import InputMask from "react-input-mask";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom";
import { X } from "phosphor-react"

interface FormRegisterOwnerData {
    name: string;
    email: string;
    cpf: string;
    phone?: string;
    address?: string;
}

const schema = z.object({
    name: z.string().nonempty("Nome obrigatório"),
    email: z.string().email("Formato inválido").nonempty("Email obrigatório"),
    cpf: z
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato inválido")
      .nonempty("CPF obrigatório"),
    phone: z
      .string()
      .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Formato inválido")
      .optional(),
    address: z.string().optional(),
});

  
type FormData = z.infer<typeof schema>;

interface CreateOwnerProps {
    isOpen: boolean,
    onClose: () => void,
    onComplete: () => void, 
}
export function CreateOwner({ isOpen, onClose, onComplete} : CreateOwnerProps) {
    if(!isOpen) return;

    const { jwt } = useContext(AuthContext)
    const [ dataChanged, setDataChanged ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const navigate = useNavigate();
    const { control, register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            name: "",
            email: "",
            cpf: "",
            phone: "",
            address: "",
        },
        resolver: zodResolver(schema)
    });

    const formFields = watch(["name", "email", "cpf", "phone", "address"]);

    useEffect(() => {
        const allFieldsFilled = formFields.every(field => !!field);
        setDataChanged(allFieldsFilled);
    }, [formFields]);

    async function handleProfileUpdate(data: FormRegisterOwnerData) {
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await fetch("http://localhost:3333/owners", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: '',
                // cpf: data.cpf,
                phone: data.phone,
                address: data.address
            })
        })
        setLoading(false)
        if (!response.ok) {
            return;
        }
        reset();
        setLoading(false);
        onComplete();
        onClose();
    }

    if (!isOpen) return null;
    
    return (
        <CreateOwnerContainer>
            <CreateOwnerContent>
            <div className="flex">
                <h1>Registrar tutor</h1>
                <X onClick={onClose} size={24 } style={{cursor:"pointer"}}></X>
            </div>
            <form onSubmit={handleSubmit(handleProfileUpdate)} action="">
                    <Input label="Nome*" name="name" register={register} required/>
                    <Input label="E-mail*" name="email" register={register} error={errors.email?.message} required/>            
                    <Controller
                        name="cpf"
                        control={control}
                        defaultValue=""
                        render={({field}) => (
                            <InputMask mask="999.999.999-99" {...field} onChange={(e) => field.onChange(e.target.value)}>
                                {(inputProps) => (
                                    <Input label="CPF*" name="cpf" register={register} error={errors.cpf?.message}  required {...inputProps}/>
                                )}
                            </InputMask>        
                        )}
                    />
                    <Controller
                        name="phone"
                        control={control}
                        defaultValue=""
                        render={({field}) => (
                            <InputMask mask="(99) 99999-9999" {...field} onChange={(e) => field.onChange(e.target.value)}>
                                {(inputProps) => (
                                    <Input label="Telefone (opcional)" name="phone" required error={errors.phone?.message} {...inputProps}/>
                                )}
                            </InputMask>        
                        )}
                    />    
                    <Input label="Endereço (opcional)" name="address" register={register}/>
                <div className="submitRow">
                    <Button type="submit" size="small" disabled={!dataChanged || loading}  loading={loading}>
                        Salvar
                    </Button>
                </div>
            </form>
            </CreateOwnerContent>
        </CreateOwnerContainer>
    )
}
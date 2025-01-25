import { Controller, useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { CreateOwnerContainer } from "./styles";
import { Button } from "../../components/Button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import InputMask from "react-input-mask";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

interface FormRegisterOwnerData {
    name: string;
    email: string;
    cpf: string;
    phone?: string;
    address?: string;
}

const schema = z.object({
    name: z.string().nonempty("Nome obrigatório"),
    email: z.string().email("Formato de email inválido").nonempty("Email obrigatório"),
    cpf: z
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve estar no formato 000.000.000-00")
      .nonempty("CPF obrigatório"),
    phone: z
      .string()
      .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone deve estar no formato (00) 00000-0000")
      .optional(),
    address: z.string().optional(),
  });

  
type FormData = z.infer<typeof schema>;

export function CreateOwner() {
    const { jwt } = useContext(AuthContext)
    const [ dataChanged, setDataChanged ] = useState(false)
    const [ loading, setLoading ] = useState(false)

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
            console.error("Erro ao registrar tutor");
            return;
        }
        console.log("sucesso!")
        reset()
        setLoading(false)
    }

    return (
        <CreateOwnerContainer>
            {errors.email && <p>{errors.email.message}</p>}
            {errors.cpf && <p>{errors.cpf.message}</p>}
            <h1>Registrar tutor</h1>
            <form onSubmit={handleSubmit(handleProfileUpdate)} action="">
                    <Input label="Nome" name="name" register={register} required/>
                    <Input label="E-mail" name="email" register={register} required/>            
                    <Controller
                        name="cpf"
                        control={control}
                        defaultValue=""
                        render={({field}) => (
                            <InputMask mask="999.999.999-99" {...field} onChange={(e) => field.onChange(e.target.value)}>
                                {(inputProps) => (
                                    <Input label="CPF" name="cpf" register={register} required {...inputProps}/>
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
                                    <Input label="Telefone" name="phone" required {...inputProps}/>
                                )}
                            </InputMask>        
                        )}
                    />    
                    <Input label="Endereço" name="address" register={register}/>
                <div className="submitRow">
                    <Button type="submit" size="small" disabled={!dataChanged || loading}  loading={loading}>
                        Salvar
                    </Button>
                </div>
            </form>
        </CreateOwnerContainer>
    )
}
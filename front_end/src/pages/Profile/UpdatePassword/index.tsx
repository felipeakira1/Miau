import { ReactNode, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { useForm } from "react-hook-form"
import { Input } from "../../../components/Input"
import { Button } from "../../../components/Button"
import { UpdatePasswordContainer, UpdatePasswordContent, UpdatePasswordHeader } from "./styles"
import { X } from "phosphor-react"

interface UpdatePasswordForm {
    newPassword: string;
    confirmNewPassword: string;
}

interface UpdatePasswordProps {
    isOpen: boolean;
    onClose: () => void;
}


export function UpdatePassword({isOpen, onClose} : UpdatePasswordProps) {
    if(!isOpen) return

    const { jwt } = useContext(AuthContext)
    const { register, handleSubmit, watch } = useForm<UpdatePasswordForm>()
    const newPassword = watch("newPassword")
    const confirmNewPassword = watch("confirmNewPassword")


    async function handleUpdatePassword({ newPassword, confirmNewPassword} : UpdatePasswordForm) {
        if(newPassword !== confirmNewPassword) {

            return
        }

        const response = await fetch("http://localhost:3333/veterinarians/me", {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify({
                password: newPassword
            })
        })
        if(!response.ok) {
            console.error("error")
        }
        console.log("sucesso!")
    }

    return (
        <>
            <UpdatePasswordContainer>
                <UpdatePasswordContent>
                    <UpdatePasswordHeader>
                        <h1>Alterar senha</h1>
                        <button onClick={onClose} className="closeButton"><X size={24}/></button>
                    </UpdatePasswordHeader>
                    <form onSubmit={handleSubmit(handleUpdatePassword)} action="">
                        <Input label="Digite a nova senha" name="newPassword" register={register} type="password"/>
                        <Input label="Confirme a nova senha" name="confirmNewPassword" register={register} type="password"/>
                        <Button variant="green" type="submit" disabled={!newPassword || !confirmNewPassword}>Salvar</Button>
                    </form>
                </UpdatePasswordContent>
            </UpdatePasswordContainer>
        </>
    )
}
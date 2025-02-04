import { useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { ProfileContainer, ProfileImage, Row, UpdatePasswordRow } from "./styles";
import { Button } from "../../components/Button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { UpdatePassword } from "./UpdatePassword";
import { UpdateImage } from "../../components/ImagePicker/UpdateImage";
import { api } from "../../services/api";
import { ToastContainer } from "react-toastify";
import { useToast } from "../../hooks/useToast";
import { ImagePicker } from "../../components/ImagePicker";

interface FormProfileData {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    crmv?: string;
    speciality: string;
}

export function Profile() {
    const { success, error } = useToast();
    const { user } = useContext(AuthContext)

    const [ originalData, setOriginalData ] = useState<FormProfileData | null>(null)
    const [ dataChanged, setDataChanged ] = useState(false)
    const [ isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ loading, setLoading ] = useState(false)
    const [ image, setImage ] = useState("")

    const { register, handleSubmit, reset, watch } = useForm<FormProfileData>();

    const currentValues = watch();

    useEffect(() => {
        if(!originalData) return;
        setDataChanged(JSON.stringify(currentValues) !== JSON.stringify(originalData));
    }, [currentValues, originalData])

    useEffect(() => {
        async function loadUserData() {
            try {
                const response = await api.get("/profile");
                console.log(response)
                const { user, veterinarian } = response.data;
                setImage(veterinarian.imageUrl)
                const initialData : FormProfileData = {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    crmv: veterinarian.crmv,
                    speciality: veterinarian.speciality,
                };
                setOriginalData(initialData)
                reset(initialData)
            } catch(err) {
                error("Erro ao carregar perfil");
            }
        }
        loadUserData();
    }, [])

    async function handleProfileUpdate(data: FormProfileData) {
        if(!originalData) return;

        setLoading(true)

        const updatedData = Object.keys(data).reduce((changes: Partial<FormProfileData>, key) => {
            if(data[key as keyof FormProfileData] !== originalData[key as keyof FormProfileData]) {
                changes[key as keyof FormProfileData] = data[key as keyof FormProfileData]
            }
            return changes;
        }, {} as Partial<FormProfileData>)

        if(Object.keys(updatedData).length === 0) {
            setLoading(false)
            console.log("Nenhuma alteração detectada");
            return;
        }

        try {
            const response = await api.put("/veterinarians/me", JSON.stringify(updatedData))
            setLoading(false)
            success("Dados atualizados com sucesso!");
            setOriginalData((prev) => ({ ...prev!, ...updatedData }));
            setDataChanged(false)
        } catch(err) {
            error("Erro ao atualizar perfil");
        }
    }
    
    return (
        <ProfileContainer>
            <ToastContainer 
                position="top-right" 
                autoClose={5000} 
                hideProgressBar={false} 
                newestOnTop={false} 
                closeOnClick 
                rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover
            />

            <h1>Profile</h1>
            <ImagePicker 
                imageUrl={image} 
                entityType="veterinarians"
                onImageChange={(newImageUrl : string) => {
                    setIsImageModalOpen(false);
                    if(newImageUrl) {
                        setImage(newImageUrl);
                        success("Imagem atualizada com sucesso!")
                    }
                }}
            />

            <UpdatePassword 
                isOpen={isModalOpen} 
                onClose={() => {
                    setIsModalOpen(false);
                    success("Senha atualizada com sucesso!")
                }}
            />

            <form onSubmit={handleSubmit(handleProfileUpdate)} action="">
                <ProfileImage>
                </ProfileImage>

                <Row>
                    <Input label="Nome" name="name" register={register} required/>
                    <Input label="E-mail" name="email" register={register} required/>
                    <UpdatePasswordRow>
                        <label htmlFor="updatePassword">Alterar senha</label>
                        <Button variant="gray" id="updatePassword" onClick={() => { setIsModalOpen(true)}} type="button">Alterar senha</Button>
                    </UpdatePasswordRow>
                </Row>

                <Row>
                    <Input label="Telefone" name="phone" register={register}/>
                    <Input label="Endereço" name="address" register={register}/>
                </Row>
                {user.role === "VETERINARIAN" && <Row>
                    <Input label="CRMV" name="crmv" register={register} required/>
                    <Input label="Especialidade" name="speciality" register={register} required/>
                </Row>}
                <div className="submitRow">
                    <Button type="submit" size="small" disabled={!dataChanged || loading} loading={loading}>
                        Salvar
                    </Button>
                </div>
            </form>
        </ProfileContainer>
    )
}
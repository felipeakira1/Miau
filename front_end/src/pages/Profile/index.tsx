import { useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { ProfileContainer, ProfileImage, Row, UpdatePasswordRow } from "./styles";
import { Button } from "../../components/Button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { UpdatePassword } from "./UpdatePassword";
import { UpdateImage } from "./UpdateImage";
import { useApi } from "../../services/api";

interface FormProfileData {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    crmv?: string;
    speciality: string;
}

export function Profile() {
    const fetchWithAuth = useApi()
    const { jwt, user } = useContext(AuthContext)
    const [ originalData, setOriginalData ] = useState<FormProfileData | null>(null)
    const [ dataChanged, setDataChanged ] = useState(false)
    const [ isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ loading, setLoading ] = useState(false)
    const [ image, setImage ] = useState("")
    const { register, handleSubmit, reset, watch } = useForm<FormProfileData>({

    });
    const currentValues = watch();

    useEffect(() => {
        if(!originalData) return;

        const hasChanges = JSON.stringify(currentValues) !== JSON.stringify(originalData);
        setDataChanged(hasChanges)
    }, [currentValues, originalData])

    async function handleProfileUpdate(data: FormProfileData) {
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if(!originalData) return;

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

        const response = await fetchWithAuth("/veterinarians/me", {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify(updatedData)
        })
        setLoading(false)
        if (!response.ok) {
            console.error("Erro ao atualizar o perfil");
            return;
        }
        
        setOriginalData((prev) => ({ ...prev!, ...updatedData }));
        setDataChanged(false)
    }

    async function loadUserData() {
        const response = await fetchWithAuth("/profile", {
            method: "GET",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${jwt}`
            },
        })

        if(!response.ok) {
            console.error("Erro ao carregar os dados do usuario");
            return;
        } 
        const { user, veterinarian } = await response.json();
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
    }

    useEffect(() => {
        loadUserData()
    }, [])

    function handleCloseModal() {
        setIsModalOpen(false)
    }
    
    return (
        <ProfileContainer>
            <h1>Profile</h1>
            <UpdateImage 
                preview={image} 
                isOpen={isImageModalOpen} 
                onClose={(newImageUrl) => {
                    setIsImageModalOpen(false);
                    console.log(newImageUrl)
                    if(newImageUrl) setImage(newImageUrl);
                }}
            />
            <UpdatePassword isOpen={isModalOpen} onClose={handleCloseModal}/>
            <form onSubmit={handleSubmit(handleProfileUpdate)} action="">
                <ProfileImage>
                    <img src={image} alt="" />
                    <button  onClick={() => {setIsImageModalOpen(true)}}>Atualizar foto</button>
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
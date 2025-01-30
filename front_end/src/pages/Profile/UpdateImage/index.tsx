import { useContext, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { Button } from "../../../components/Button"
import { X } from "phosphor-react"
import { UpdateImageContainer, UpdateImageContent, UpdateImageHeader } from "./styles"

interface UpdatePasswordProps {
    preview: string;
    isOpen: boolean;
    onClose: (newImageUrl? : string) => void;
}


export function UpdateImage({preview: image, isOpen, onClose} : UpdatePasswordProps) {
    if(!isOpen) return

    const { jwt } = useContext(AuthContext)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(image);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event?.target.files?.[0];
        if(file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    async function handleUpdateImage() {
        if(!selectedFile) {
            return
        }
        setLoading(true)
        const formData = new FormData();
        formData.append("file", selectedFile);

         try{
             const response = await fetch("http://localhost:3333/veterinarians/me/upload", {
                 method: "PATCH",
                 headers: { 
                     "Authorization": `Bearer ${jwt}`
                 },
                 body: formData,
             })
             setLoading(false)

             if(!response.ok) {
                throw new Error("Erro ao enviar a imagem");
            }
            const responseData = await response.json();
            const newImageUrl = responseData.veterinarian.imageUrl;
            onClose(newImageUrl);
         } catch(err) {
            console.error("Erro no upload", err);
         }
    }

    return (
        <>
            <UpdateImageContainer>
                <UpdateImageContent>
                    <UpdateImageHeader>
                        <h1>Alterar imagem de perfil</h1>
                        <button onClick={() => onClose()} className="closeButton"><X size={24}/></button>
                    </UpdateImageHeader>
                    {
                        preview ? 
                        <img src={preview} alt="Prévia" style={{ maxWidth: "300px", marginBottom: "10px" }} />
                        :
                        image && <img src={image} alt="Imagem atual" style={{ maxWidth: "300px", marginBottom: "10px" }} />
                    }
                    <Button variant="gray" className="pickImage" onClick={() => document.getElementById("fileInput")?.click()}>
                        Selecionar Imagem
                    </Button>
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />

                    <Button onClick={handleUpdateImage} disabled={!selectedFile || loading} loading={loading}>
                        Enviar
                    </Button>
                </UpdateImageContent>
            </UpdateImageContainer>
        </>
    )
}
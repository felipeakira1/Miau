import { useEffect, useState } from "react";
import { UpdateImage } from "./UpdateImage";
import { ImagePickerContent } from "./UpdateImage/styles";
import { Button } from "../Button";

interface ImagePickerProps {
    entityType: "veterinarians" | "owners" | "animals";
    entityId?: number;
    imageUrl: string;
    onImageChange: (newImageUrl: string) => void;
}

export function ImagePicker({entityType, entityId, imageUrl, onImageChange } : ImagePickerProps) {
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [preview, setPreview] = useState(imageUrl);

    useEffect(() => {
        setPreview(imageUrl);
    }, [imageUrl]);
    
    return (
        <ImagePickerContent>
            <img src={preview} alt="" />
            <Button variant="gray" size="small" onClick={() => {setIsModalOpen(true)}} type="button">Atualizar foto</Button>

            <UpdateImage
                entityType={entityType}
                entityId={entityId}
                preview={imageUrl}
                isOpen={isModalOpen}
                onClose={(newImageurl) => {
                    if(newImageurl) {
                        setPreview(newImageurl);
                        onImageChange(newImageurl)
                    }
                    setIsModalOpen(false);
                }}
            />
        </ImagePickerContent>
    )
}
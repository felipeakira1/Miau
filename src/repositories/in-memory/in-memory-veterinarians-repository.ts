import { Veterinarian } from "@prisma/client";
import { CreateVeterinarianInterface } from "../veterinarians-repository";


export class InMemoryVeterinariansInterface {
    private veterinarians : Veterinarian[] = []

    async create(data : CreateVeterinarianInterface) {
        const veterinarian = {
            id: this.veterinarians.length + 1,
            crmv: data.crmv,
            speciality: data.speciality,
            imageUrl: data.imageUrl
        } as Veterinarian

        this.veterinarians.push(veterinarian)
        return veterinarian
    }
}
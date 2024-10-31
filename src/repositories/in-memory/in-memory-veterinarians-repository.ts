import { Veterinarian } from "@prisma/client";
import { CreateVeterinarianInterface } from "../veterinarians-repository";


export class InMemoryVeterinariansRepository {
    private veterinarians : Veterinarian[] = []

    async create(data : CreateVeterinarianInterface) {
        const veterinarian = {
            id: this.veterinarians.length + 1,
            userId: data.userId,
            crmv: data.crmv,
            speciality: data.speciality,
            imageUrl: data.imageUrl
        } as Veterinarian

        this.veterinarians.push(veterinarian)
        return veterinarian
    }

    async retrieveByUserId(id : number) : Promise<Veterinarian | null> {
        const veterinarian = this.veterinarians.find((veterinarian) => veterinarian.userId === id)
        return veterinarian || null
    }
}
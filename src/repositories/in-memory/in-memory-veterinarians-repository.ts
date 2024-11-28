import { Veterinarian } from "@prisma/client";
import { CreateVeterinarianInterface, VeterinariansRepository } from "../veterinarians-repository";


export class InMemoryVeterinariansRepository implements VeterinariansRepository {
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

    async retrieveAll(): Promise<Veterinarian[]> {
        const veterinarians = this.veterinarians
        return veterinarians
    }

    async retrieveByUserId(id : number) : Promise<Veterinarian | null> {
        const veterinarian = this.veterinarians.find((veterinarian) => veterinarian.userId === id)
        return veterinarian || null
    }

    async retrieveByCrmv(crmv: string): Promise<Veterinarian | null> {
        const veterinarian = this.veterinarians.find((veterinarian) => veterinarian.crmv === crmv)
        return veterinarian || null
    }
}